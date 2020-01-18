const boom = require('@hapi/boom');
const { config } = require('../../config');

//Determino si agrego el Stack o no segun el ambiente produccion o desarrollo
//El stack es toda la informacion relaciona al error
function withErrorStack(error, stack) {
  if (config.dev) {
    //El spread se usa porque ya no solo es un mensaje sino unas propiedades: el error,mensaje,statusCode
    return { ...error, stack };
  }

  return error;
}

//funcionalidad para ver el error en consola
function logErrors(err, req, res, next) {
  console.log(err);
  //llamando el siguiente middleware de error
  next(err);
}

//Con esta funcion pasamos todos los Errores que no sean de tipo boom a la estructura de errores de boom
function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

//funcionalidad de manejo de error, por defecto express imprime los errores en formato html pero con este middleware vamos a transformarlo a json porque estamos implementando una API.
function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err;
  // eslint-disable-line
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler
};
