//La utilidad consola es muy diferente a la clase consola que es la que estamos utilizando
const fs = require("fs");

//Archivos que creamos para almacenar los logs
const out = fs.createWriteStream("./out.log");
const err = fs.createWriteStream("./err.log");

//creando nuestra consola personalizada con la clase Console()
const consoleFile = new console.Console(out, err);

setInterval(() => {
  consoleFile.log(new Date());
  consoleFile.error(new Error("Ooops!"));
}, 2000);
