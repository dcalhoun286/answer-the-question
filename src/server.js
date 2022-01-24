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

module.exports = {
  app: app,
  start: (port) => {
    try {

      app.listen(port, () => {
        console.log(`server up on port ${port}`);
      });

    } catch (err) {

      console.error(err);

    }
  },
}