const fs = require("fs");

//copiando archivos
//copiFile("nomArchi a copiar", "nomArch nuevo", err)
fs.copyFile("naranja.txt", "limon.txt", err => {
  if (err) {
    console.log(err);
  }

  console.log("naranja.txt fue copiado como limon.txt");
});
