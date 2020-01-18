const express = require('express');
const app = express();

const { config } = require('../config/index');

app.get('/', (req, res) => {
  res.send(
    `para este caso se debe indicar los valores como: http://localhost:${config.port}/1994`
  );
});

app.get('/:year', function(req, res) {
  const year = req.params.year;
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    res.send('Bisiesto');
  } else {
    res.send('No es bisiesto');
  }
});

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});
