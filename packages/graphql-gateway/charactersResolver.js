const SERVICE_CHARACTERS_URL = process.env.SERVICE_CHARACTERS_URL;

const characters = async (parent) => {
  let response;
  try {
    response = await fetch(SERVICE_CHARACTERS_URL + '/characters');
  } catch (err) {
    throw new Error('Could not retrieve characters', err);
  }

  const characters = (await response.json()).results;
  return characters;
};

const character = async (parent, { id }) => {
  let response;

  try {
    response = await fetch(SERVICE_CHARACTERS_URL + `/characters/${id}`);
  } catch (err) {
    throw new Error('Could not retrieve character', err);
  }

  const character = await response.json();
  if (!character.name) {
    return null;
  } else {
    return character;
  }
};

module.exports = {
  characters,
  character
};
