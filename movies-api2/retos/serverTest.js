const express = require('express');

//Instance of the Server
const app = express();

//Enviroment Variables
const { config } = require('../config/index');

app.get('/', function(req, res) {
  //res.send("hello world") o puede ser:
  res.json({ hello: 'world' });
});

//PORT SERVER
app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});

//recuerda que necesitas agregarlo en los scripts de packge.json para que funcione
