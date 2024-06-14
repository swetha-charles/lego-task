const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/characters', async (_, res) => {
  res.send('Hello')
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
