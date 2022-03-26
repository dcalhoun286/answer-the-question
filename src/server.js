'use strict';

const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const cp = require('child_process');
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/pages/index.html');
});


//The POST request below is handling the form data

app.post('/', (req, res) => {

  /*
    ====== TODO ======
      - I have an if statement here because I'm not yet sure why two request bodies are being sent to the server and need to debug this. The first one being sent is an empty object, followed by the object I am expecting.
      - Code below in this POST request needs to eventually be modified once there are actual shell scripts to run so that a certain shell script will run based on the key/value pairs in req.body
  */
  
  if(!req.body.scenario) {
    console.log(null);
  } else {

    const resolvedPath = `${require('path').resolve('./src/test.sh')}`;

    /* 
      Docs I'm using in case I need to come back to this:
        - https://medium.com/stackfame/how-to-run-shell-script-file-or-command-using-nodejs-b9f2455cb6b7
        - https://nodejs.org/api/child_process.html
        - https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback
    */
    cp.exec(`sh ${resolvedPath}`, (err, stdout, stderr) => {
      console.log(stdout);
      if (err) { console.error(`error: ${err}`); }
      if (stderr) { console.log(`stderr: ${stderr}`); }
    });

    res.status(200).send( { status: 'ok' } );

    /*
      ---TODO---
  
      Render a different HTML page after form submission so that the above successful response status is more user friendly
    */

  }

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
