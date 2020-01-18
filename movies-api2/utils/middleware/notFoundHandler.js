//Manejo de errores 404
const boom = require('@hapi/boom');

function notFoundHandler(req, res) {
  const {
    output: { statusCode, payload }
  } = boom.notFound();

  res.status(statusCode).json(payload);
}

//no usamos next porque solo funciona si se ejecuta alfinal de las rutas en index.js por lo que ya terminaria el proceso sin buscar otro middleware.
module.exports = notFoundHandler;
