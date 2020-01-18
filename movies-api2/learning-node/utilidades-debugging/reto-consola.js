/* El módulo útil esta diseñado para resolver las necesidades internas de las API de Node, sin embargo muchas de estas utilidades también son útiles para los módulos de las aplicaciones en desarrollo. Se puede acceder a estas utilidades usando:
const util = require('util');

util.format()
El método util.format () devuelve una cadena formateada utilizando el primer argumento como una cadena de formato tipo printf que puede contener cero o más especificadores de formato. Cada especificador se reemplaza con el valor convertido del argumento correspondiente. Los especificadores compatibles son:

    %s - String
    %d - Number
    %i - parseInt(value, 10)
    %f - parseFloat(value)
    %j - JSON
    %o - Object
    %c - Css
    %% - signo de '%'
    Inspector
    cuando se inicia la inspección --inspect, Node escucha a un cliente de depuración , Por defecto escuchara el host y el puerto 127.0.0.1:9229 y a cada proceso se le asigna un id único.
    Opciones de la línea de comandos
    --inspect: Habilita el agente de inspección y escucha el puerto por defecto 127.0.0.1:9229
    --inspect=[host:port]: Habilita el agente de inspección, vincula la dirección y el puerto a la dirección de inspección.

Reto (estuvo super interesante me costo mucho trabajo) */

const util = require("util");

const log = new console.Console({
  stdout: process.stdout,
  strerr: process.strerr
});

const emojis = {
  log: "  \u001b[37m ☺",
  danger: "  \u001b[31m ☠",
  info: "  \u001b[34m ℹ",
  warning: "  \u001b[33m ⚠",
  love: "  \u001b[35m ❤"
};

console.Console.prototype.logger = function(text) {
  this.log(`${emojis.log}${text}`);
};

console.Console.prototype.warning = function(text) {
  this.warn(`${emojis.warning}${text}`);
};

console.Console.prototype.information = function(text) {
  this.info(`${emojis.info}${text}`);
};

console.Console.prototype.danger = function(text) {
  this.error(`${emojis.danger}${text}`);
};

console.Console.prototype.love = function() {
  this.error(`${emojis.love} This was made with love for you`);
};

log.logger("this is a normal log");
log.information("this is a info log");
log.warning("this is a warning log you should read it");
log.danger("this is a error log, You are in fire");
log.love();
