const fs = require("fs");

try {
  //leer de la terminal en la 3 posicion de leactura en este caso el archivo a leer esto biene dado por argv
  const file = process.argv[2];

  const content = fs.readFileSync(file).toString();

  const lines = content.split("\n").length;
  console.log(lines);
} catch (err) {
  console.log(err);
}
