//esta es una utilidad para mantener codido indicamos que no se deberia seguir utilizando, es util al hacer refactori del codigo asi podemos indicarle a los usuarios que hay ciertas funcionalidades que van a desaparecer en la proxima version como ejemplo.

const util = require("util");

const helloPluto = util.deprecate(() => {
  console.log("hello pluto");
}, "pluto is deprecated. It is not a planet anymore");

helloPluto();
