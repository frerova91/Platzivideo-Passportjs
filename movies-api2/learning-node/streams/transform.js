//Similar al duplex solo que la sintaxis es mucho mas corta.
const { Transform } = require("stream");

const transformStream = new Transform({
  //Afuera es el write
  transform(chunk, enconding, callback) {
    //Dentro es el readable
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin.pipe(transformStream).pipe(process.stdout);
//stdin permite leer desde la terminal
//stdout permite mostrar en la terminal

//solo hay que escribir en la consola para ver el resultado
