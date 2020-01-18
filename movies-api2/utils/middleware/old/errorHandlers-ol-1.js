const { config } = require('../../config');

//Determino si agrego el Stack o no segun el ambiente produccion o desarrollo
//El stack es toda la informacion relaciona al error
function withErrorStack(error, stack) {
  if (config.dev) {
    return { error, stack };
  }

  return error;
}

//funcionalidad para ver el error en consola
function logErrors(err, req, res, next) {
  console.log(err);
  //llamando el siguiente middleware de error
  next(err);
}

//funcionalidad de manejo de error, por defecto express imprime los errores en formato html pero con este middleware vamos a transformarlo a json porque estamos implementando una API.
function errorHandler(err, req, res, next) {
  // eslint-disable-line
  res.status(err.status || 500);
  res.json(withErrorStack(err.message, err.stack));
}

module.exports = {
  logErrors,
  errorHandler
};
