const fs = require("fs");

//creando archivos con un path establecido debe ser recursivo, para que lo cree si no existe el directorio, cuidado con el tipo de ruta relativa o absoluta
fs.mkdir("platzi/escuela-js/node", { recursive: true }, err => {
  if (err) {
    return console.log(err);
  }
});
