const NodeCache = require('node-cache');
const SWAPI_CHARACTER_URL = 'https://swapi.dev/api/people';

// TODO use a logger. This should be swapped to a null logger in tests to not clutter up the console.

/**
 * stdTTL: standard time to live (entries stale after 60 mins)
 * checkperiod: entries deleted after this time (entries automatically deleted after 2 hours)
 */
const swapiCache = new NodeCache({ stdTTL: 60 * 60, checkperiod: 120 * 60 });

const getStarWarsCharacters = async () => {
  const characters = [];

  let url = SWAPI_CHARACTER_URL;

  while (url != null) {
    const { results, next } = await getData(
      url,
      `Network Failure: could not retrieve SW characters from ${url}`
    );

    characters.push(...results);
    url = next;
  }

  return Promise.all(
    characters.map(async (character) => ({
      name: character.name,
      homeworld: await getCharacterHomeworld(character),
      films: await getCharacterFilms(character),
    }))
  );
};

const getStarWarsCharacter = async (id) => {
  const url = `${SWAPI_CHARACTER_URL}/${id}`;
  const character = await getData(
    url,
    `Network Failure: could not retrieve SW character from ${url}`
  );

  return {
    name: character.name,
    homeworld: await getCharacterHomeworld(character),
    films: await getCharacterFilms(character),
  };
};

const getCharacterHomeworld = async (character) => {
  const url = character.homeworld;

  let name = swapiCache.get(url);

  if (!name) {
    ({ name } = await getData(
      url,
      `Network Failure: could not retrieve SW homeworld from ${url}`
    ));
    swapiCache.set(url, name);
  }

  return name;
};

const getCharacterFilms = async (character) => {
  const filmUrls = character.films;
  const films = [];

  for (const url of filmUrls) {
    let title = swapiCache.get(url);

    if (!title) {
      ({ title } = await getData(
        url,
        `Network Failure: could not retrieve SW films from ${url}`
      ));
      swapiCache.set(url, title);
    }
    films.push(title);
  }
  return films;
};

const getData = async (url, errorMessage) => {
  let response;

  try {
    response = await fetch(url);
  } catch (err) {
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  return response.json();
};

module.exports = {
  getStarWarsCharacters,
  getStarWarsCharacter,
  getCharacterHomeworld,
  getCharacterFilms,
  SWAPI_CHARACTER_URL,
};
