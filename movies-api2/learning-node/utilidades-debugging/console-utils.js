// %s  = string
// %d  = numero
// %j  = json

// console.log("Un %s y un %s", "perrito", "gatito");

//console.info y warn son alias de console.log
// console.info("hello world");
// console.warn("hello error");

//Verificacion es un boleano
// console.assert(42 == "42");
// console.assert(42 === "42");

//Indica la linea del error
// console.trace("hello");

//El debuglog nos permite eso debuguear
const util = require("util");
const debuglog = util.debuglog("foo");

debuglog("hello from foo");

//para utilizarlar la debes iniciar el archivo asi:
//NODE_DEBUG=foo node console-utils.js
