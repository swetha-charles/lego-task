// The following uses a implementation of NodeCache. This setup allows the test to spy and flush the cache as needed.
const NodeCache = jest.requireActual('node-cache');
const mockCache = new NodeCache();
jest.mock('node-cache', () => {
  return jest.fn().mockImplementation(() => mockCache);
});

const {
  getStarWarsCharacters,
  getStarWarsCharacter,
  getCharacterHomeworld,
  getCharacterFilms,
} = require('./swapiClient');

const nock = require('nock');
const mockSWAPIresponse = require('./__mocks__/mockUtils');
const getCharactersPg1Mock = require('./__mocks__/get-characters-pg1.json');
const getCharactersPg2Mock = require('./__mocks__/get-characters-pg2.json');
const getCharacterId4 = require('./__mocks__/get-character-id4.json');
const getPlanets22Mock = require('./__mocks__/get-planets-22.json');
const getFilms1Mock = require('./__mocks__/get-films-1.json');
const getFilms2Mock = require('./__mocks__/get-films-2.json');

const SWAPI_URL = 'https://swapi.dev/api';

describe('SWAPI client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCache.flushAll();
    nock.cleanAll();
  });

  describe('get all characters', () => {
    it('should return 2 pages of character data', async () => {
      mockSWAPIresponse();

      const characters = await getStarWarsCharacters();

      // Only the first two pages are mocked
      const expectedCharacters = await Promise.all(
        [...getCharactersPg1Mock.results, ...getCharactersPg2Mock.results].map(
          async (c) => {
            const homeworld = await getCharacterHomeworld(c);
            const films = await getCharacterFilms(c);

            return { name: c.name, homeworld, films };
          }
        )
      );

      expect(characters).toEqual(expectedCharacters);
    });

    it('should throw error if fetch call to SWAPI character url fails', async () => {
      jest
        .spyOn(global, 'fetch')
        .mockImplementationOnce(() => Promise.reject());

      expect(() => getStarWarsCharacters()).rejects.toThrow(
        `Network Failure: could not retrieve SW characters`
      );
    });
  });

  describe('get character by id', () => {
    it('should return pruned character data for id ', async () => {
      mockSWAPIresponse();

      const character = await getStarWarsCharacter('4');

      const expectedCharacter = {
        name: getCharacterId4.name,
        homeworld: await getCharacterHomeworld(getCharacterId4),
        films: await getCharacterFilms(getCharacterId4),
      };

      expect(character).toEqual(expectedCharacter);
    });

    it('should throw error if fetch call to SWAPI character url fails', async () => {
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.reject());

      expect(() => getStarWarsCharacter('4')).rejects.toThrow(
        `Network Failure: could not retrieve SW character`
      );
    });
  });

  describe('get films', () => {
    it('should return film information for character', async () => {
      nock(SWAPI_URL).get('/films/1/').reply(200, getFilms1Mock);
      nock(SWAPI_URL).get('/films/2/').reply(200, getFilms2Mock);

      const hanSolo = {
        name: 'Han Solo',
        homeworld: 'https://swapi.dev/api/planets/22/',
        films: [
          'https://swapi.dev/api/films/1/',
          'https://swapi.dev/api/films/2/',
        ],
      };

      const hanSoloFilms = await getCharacterFilms(hanSolo);
      expect(hanSoloFilms).toEqual([getFilms1Mock.title, getFilms2Mock.title]);
    });

    it('should fetch SWAPI data when cache store does not contain film url', async () => {
      const scope = nock(SWAPI_URL).get('/films/1/').reply(200, getFilms1Mock);

      const filmUrl = `${SWAPI_URL}/films/1/`;
      const hanSolo = {
        name: 'Han Solo',
        homeworld: 'https://swapi.dev/api/planets/22/',
        films: [filmUrl],
      };

      // This checks that the cache is empty for film URL
      expect(mockCache.get(filmUrl)).toBeUndefined();
      await getCharacterFilms(hanSolo);
      //  This checks that the call to SWAPI (mocked above) was called
      expect(scope.isDone()).toBe(true);
    });

    it('should not fetch SWAPI data when film url exists in cache', async () => {
      const scope = nock(SWAPI_URL).get('/films/1').reply(200, getFilms1Mock);

      const filmUrl = `${SWAPI_URL}/films/1`;
      const filmTitle = 'A New Hope';
      // This sets the cache for the film URL
      mockCache.set(filmUrl, filmTitle);

      const hanSolo = {
        name: 'Han Solo',
        homeworld: 'https://swapi.dev/api/planets/22/',
        films: [filmUrl],
      };

      await getCharacterFilms(hanSolo);
      //  This checks that the call to SWAPI (mocked above) was NOT called
      expect(scope.isDone()).toBe(false);
    });

    it('should throw error if fetch call to SWAPI film url fails', async () => {
      jest
        .spyOn(global, 'fetch')
        .mockImplementationOnce(() => Promise.reject());

      const hanSolo = {
        name: 'Han Solo',
        homeworld: 'https://swapi.dev/api/planets/22/',
        films: ['https://swapi.dev/api/films/1/'],
      };

      expect(() => getCharacterFilms(hanSolo)).rejects.toThrow(
        `Network Failure: could not retrieve SW films`
      );
    });
  });

  describe('get homeworld', () => {
    it('should return homeworld information for character', async () => {
      nock(SWAPI_URL).get('/planets/22/').reply(200, getPlanets22Mock);

      const hanSolo = {
        name: 'Han Solo',
        homeworld: 'https://swapi.dev/api/planets/22/',
        films: [
          'https://swapi.dev/api/films/1/',
          'https://swapi.dev/api/films/2/',
          'https://swapi.dev/api/films/3/',
        ],
      };

      const hanSoloHomeworld = await getCharacterHomeworld(hanSolo);
      expect(hanSoloHomeworld).toEqual(getPlanets22Mock.name);
    });

    it('should fetch SWAPI data when cache store does not contain homeworld url', async () => {
      const scope = nock(SWAPI_URL)
        .get('/planets/22/')
        .reply(200, getPlanets22Mock);

      const homeworldUrl = 'https://swapi.dev/api/planets/22/';

      const hanSolo = {
        name: 'Han Solo',
        homeworld: homeworldUrl,
        films: ['https://swapi.dev/api/films/1/'],
      };

      expect(mockCache.get(homeworldUrl)).toBeUndefined();
      await getCharacterHomeworld(hanSolo);
      expect(scope.isDone()).toBe(true);
    });

    it('should not fetch SWAPI data when homeworld url exists in cache', async () => {
      const scope = nock(SWAPI_URL)
        .get('/planets/22')
        .reply(200, getPlanets22Mock);

      const homeworldUrl = `${SWAPI_URL}/planets/22`;
      const homeworld = 'Corellia';
      mockCache.set(homeworldUrl, homeworld);

      const hanSolo = {
        name: 'Han Solo',
        homeworld: homeworldUrl,
        films: ['https://swapi.dev/api/films/1/'],
      };

      await getCharacterHomeworld(hanSolo);
      expect(scope.isDone()).toBe(false);
    });

    it('should throw error if fetch call to SWAPI homeworld url fails', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject());

      const hanSolo = {
        name: 'Han Solo',
        homeworld: 'https://swapi.dev/api/planets/22/',
        films: ['https://swapi.dev/api/films/1/'],
      };

      expect(() => getCharacterHomeworld(hanSolo)).rejects.toThrow(
        `Network Failure: could not retrieve SW homeworld`
      );
    });
  });
});
