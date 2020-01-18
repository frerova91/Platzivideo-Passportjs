//este archivo nos servira de momento para prubas y entender como definir las rutas, mas adelante conectaremos con bases de datos y eso. Aqui estamos consumiendo info de los mocks directamente.

const express = require('express');
//Archivo de datos falsos datos de pruebas
const { moviesMock } = require('../utils/mocks/movies');

//funcion que consume una app de express
function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  //Aqui definimos las rutas
  router.get('/', async function(req, res, next) {
    try {
      const movies = await Promise.resolve(moviesMock);
      res.status(200).json({
        data: movies,
        massege: 'Movies Listed'
      });
    } catch (err) {
      next(err);
    }
  });

  //Implementando metodos CRUD

  //Buscado por medio del ID
  router.get('/:movieId', async function(req, res, next) {
    try {
      const movies = await Promise.resolve(moviesMock[0]);
      res.status(200).json({
        data: movies,
        massege: 'Movie retrive'
      });
    } catch (err) {
      next(err);
    }
  });

  //Creando y recibiendo la pelicula
  router.post('/', async function(req, res, next) {
    try {
      const createMovieId = await Promise.resolve(moviesMock[0].id);
      //cuando creamos el codigo es 201
      res.status(201).json({
        data: createMovieId,
        massege: 'Movies created'
      });
    } catch (err) {
      next(err);
    }
  });

  //Actualizando las peliculas
  router.put('/:movieId', async function(req, res, next) {
    try {
      const updatedMovieId = await Promise.resolve(moviesMock[0].id);
      res.status(200).json({
        data: updatedMovieId,
        massege: 'Movie updated'
      });
    } catch (err) {
      next(err);
    }
  });

  //Borrar las Peliculas
  router.delete('/:movieId', async function(req, res, next) {
    try {
      const movies = await Promise.resolve(moviesMock[0].id);
      res.status(200).json({
        data: movies,
        massege: 'Movies deleted'
      });
    } catch (err) {
      next(err);
    }
  });
}

//Aqui podemos encontrar los codigos de estatus de http catalogadas como information,redirects,successfull,clientErrors,//serverErrors.
//https://developer.mozilla.org/es/docs/Web/HTTP/Status

// Ahora tenemos que exportarla, porque aquí estamos definiendo la ruta pero no la estamos usando
// en nuestra aplicación de express
module.exports = moviesApi;
