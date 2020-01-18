const fs = require("fs");

//recuerda el codigo async debe recibir un callback con error first siempre

const files = fs.readdir(__dirname, (err, files) => {
  //__dirname tiene la info del directorio actual
  if (err) {
    return console.log(err);
  }

  console.log(files);
});
