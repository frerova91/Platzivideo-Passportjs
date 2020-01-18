//verificando si no tenemos el cache activado
const { config } = require('../config/index');

function cacheResponse(res, seconds) {
  //determinando si estamos en el modo development
  if (!config.dev) {
    //debe ser escrito asi mismo Cache-Control
    res.set('Cache-Control', `public, max-age=${seconds}`);
  }
}

module.exports = cacheResponse;

//no todas las rutas deben de tener cache solo en las que estemos requiriendo recursos, porque bueno por ejemplo al crear una elicula no deberia aber cache.
