const nock = require('nock');

const getCharactersPg1Mock = require('./get-characters-pg1.json');
const getCharactersPg2Mock = require('./get-characters-pg2.json');
const getCharacterId4 = require('./get-character-id4.json');
const getPlanets22Mock = require('./get-planets-22.json');
const getFilms1Mock = require('./get-films-1.json');

const SWAPI_URL = 'https://swapi.dev/api';

function mockSWAPIresponse() {
  nock(SWAPI_URL).get('/people').reply(200, getCharactersPg1Mock);
  nock(SWAPI_URL).get('/people/?page=2').reply(200, getCharactersPg2Mock);
  nock(SWAPI_URL).get('/people/?page=3').reply(500, {});

  nock(SWAPI_URL).get('/people/4').reply(200, getCharacterId4);

  nock(SWAPI_URL).persist().get(uri => uri.includes('planets')).reply(200, getPlanets22Mock);

  nock(SWAPI_URL).persist().get(uri => uri.includes('films')).reply(200, getFilms1Mock);
}

module.exports = mockSWAPIresponse;
