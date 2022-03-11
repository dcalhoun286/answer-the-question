'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Success -- Homepage');
});

app.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

const start = (port) => {

  if (!port) { throw new Error ('Missing Port'); }

  app.listen(port, () => console.log(`Server up on port ${port}`));
}

module.exports = {
  app: app,
  start: start,
}