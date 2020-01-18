const fs = require("fs");

// process.argv[2] indica el numero de argumentos a leer en consola en este caso indica como leer el archivo a ser processado por este programa, seria de la siguiente forma > $ node async-files.js naranja.txt
const file = process.argv[2];

if (!file) {
  throw new Error("Debes indicar el archivo que quieres leer");
}

const content = fs.readFile(file, function(err, content) {
  if (err) {
    return console.log(err);
  }

  const lines = content.toString().split("\n").length;
  console.log(lines);
});
