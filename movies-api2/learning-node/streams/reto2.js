/*Esta es otra forma de hacer lo mismo
El propósito de tener distintos tipos de streams no solo es simplificar el código, tienen pequeñas diferencias en su objetivo.

Tipos de streams
Hay cuatro tipos fundamentales de streams en Node.js

    Writable: streams en los que los datos pueden ser escritos.
    Readable: streams en los que los datos pueden ser leídos.
    Duplex: streams que pueden ser leídos y escritos.
    Transform: Duplex streams que pueden modificar o transformar los datos cuando son escritos o leídos.
*/

//Mi Reto desglosado

const { Transform } = require("stream");

//ingresa un string y convierte el primer
//carácter a mayúscula

const upperFirst = text => {
  //obtiene primer letra y convierte a mayúscula
  let first = text.charAt(0).toUpperCase();
  //el string a partir de la segunda letra
  let rest = text.slice(1);
  //unión primer letra + resto
  return first + rest;
};

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    //la cadena de entrada en string
    const strChunk = chunk.toString();
    //cadena en minúsculas
    const lowerChunk = strChunk.toLowerCase();
    //array separado por espacio en blanco
    const arrayChunk = lowerChunk.split(" ");
    /**
     * creación de un nuevo array con camelCase
     * si  i (index) es 0 se retorna la primer
     * palabra sin cambios, si no se cambia la
     * primer letra de la palabra a mayúscula
     */
    const arrayCamel = arrayChunk.map((word, i) => {
      return i === 0 ? word : upperFirst(word);
    });
    //se junta el array anterior y listo
    const camelCase = arrayCamel.join("");
    this.push(camelCase);
    //finaliza la el flujo para esta chunk
    callback();
  }
});
process.stdin.pipe(transformStream).pipe(process.stdout);

//Mi reto simplificado

/* const { Transform } = require("stream");

const upperFirst = text => {
  return text
    .charAt(0)
    .toUpperCase()
    .concat(text.slice(1));
};

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    const camelCase = chunk
      .toString()
      .toLowerCase()
      .split(" ")
      .map((word, index) => {
        return index === 0 ? word : upperFirst(word);
      })
      .join("");
    this.push(camelCase);
    callback();
  }
}); */

process.stdin.pipe(transformStream).pipe(process.stdout);

//se puede optimizar más pero no se vería bien en este cuadrito de los aportes, esto lo hago con la finalidad de ayudar un poco a entender el código a los que no entienden muy bien 😃.
