const express = require('express');
const cors = require('cors');

const {
  getStarWarsCharacters,
} = require('./swapiClient');

const app = express();
app.use(cors());

app.get('/characters', async (_, res) => {
  return getStarWarsCharacters()
    .then((characters) => res.send({ results: characters }))
    .catch((err) => res.status(500).send({ err }));
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
