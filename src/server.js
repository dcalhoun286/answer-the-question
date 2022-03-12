'use strict';

const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/pages/index.html');
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