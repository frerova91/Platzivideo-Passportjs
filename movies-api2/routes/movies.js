//este archivo nos servira de momento para prubas y entender como definir las rutas, mas adelante conectaremos con bases de datos y eso.

const express = require('express');
const passport = require('passport');
//Archivo de datos falsos datos de pruebas ---Eliminamos la capa de mocks para usar la de servicios
const MoviesServices = require('../services/movies');

//Importando los schemas para la conexion con la DB
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
} = require('../utils/schema/movies');

//Importando la validacion para la DB
const validationHandler = require('../utils/middleware/validationHandler');
//Importando la validacion de los Scopes
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

//Requirendo cache para algunas rutas esto se usa mayormente para el dev
const cacheResponse = require('../utils/cacheResponse');
//tiempo de vida del cahce
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

// JWT Strategy
require('../utils/auth/strategies/jwt');

//funcion que consume una app de express
function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  //Instanciando un nuevo servicio
  const moviesServices = new MoviesServices();

  //-----------------    Aqui definimos las rutas   -----------------------------

  //Aqui passport actua como un middleware y en este caso no requiere de un custom callback, de esta forma protegemos nuestros endpoint con passport. Cn lo que la unica manera de obtener acceso es si tenemos un jwt valido.
  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:movies']),
    async function(req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      //los tags probiene del query de la url recuerda response.object y request.object la lectura del curso
      const { tags } = req.query;
      try {
        //getMovies probiene del la capa de servicios
        const movies = await moviesServices.getMovies({ tags });
        //Hardcode Error para ver un error
        //throw new Error('error for testing propuses');
        res.status(200).json({
          data: movies,
          massage: 'movies Listed'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  //NOTA:La diferencia principal entre parametros y query es que: los parametros estan establecidos en l url y query es cuando se le pone ?-nombreQuery- y ademas se puede concatenar.

  //Implementando metodos CRUD
  //Buscado por medio del ID
  //NOTA: Los middleware van entre la ruta y la definicion de la ruta tantos como se quiera
  router.get(
    '/:movieId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:movies']),
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async function(req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      //en este caso el id biene como parametro en la url
      const { movieId } = req.params;
      try {
        const movies = await moviesServices.getMovie({ movieId });
        res.status(200).json({
          data: movies,
          massage: 'Movie retrive'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  //Creando y recibiendo la pelicula
  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:movies']),
    validationHandler(createMovieSchema),
    async function(req, res, next) {
      //en este caso biene es del cuerpo el body con un alias para ser mas especifioc en este caso boyd: movie(alias)
      const { body: movie } = req;
      try {
        const createMovieId = await moviesServices.createMovie({ movie });
        //cuando creamos el codigo es 201
        res.status(201).json({
          data: createMovieId,
          massage: 'Movies created'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  //Actualizando las peliculas
  router.put(
    '/:movieId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:movies']),
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    async function(req, res, next) {
      const { movieId } = req.params;
      const { body: movie } = req;
      try {
        const updatedMovieId = await moviesServices.updateMovie({
          movieId,
          movie
        });
        res.status(200).json({
          data: updatedMovieId,
          massage: 'Movie updated'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  //Reto:
  //NOTA: PATCH como PUT se usa para actualizaciones pero con la diferencia de que este es usado para hacer cambios en una parte del recurso en una locacion y no el recurso completo es descrito como una minorUpdate y fallara si el recurso no existe. Mas info https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
  router.patch('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    const { body: movie } = req;

    try {
      const partiallyUpdatedMovieId = await moviesServices.partialUpdateMovie({
        movieId,
        movie
      });

      res.status(200).json({
        data: partiallyUpdatedMovieId,
        massage: 'partially updated movie'
      });
    } catch (err) {
      next(err);
    }
  });

  //Borrar las Peliculas
  router.delete(
    '/:movieId',
    passport.authenticate('jwt', { session: false }), //Validar Autenticacion
    scopesValidationHandler(['delete:movies']), //Validar Permisos Necesarios
    validationHandler({ movieId: movieIdSchema }, 'params'), //Validar que los Datos esten Correctos
    async function(req, res, next) {
      const { movieId } = req.params;
      try {
        const movies = await moviesServices.deleteMovie({ movieId });
        res.status(200).json({
          data: movies,
          massage: 'Movies deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

//NOTA: la unica responsabilidad de las rutas es saber como recibe los parametros y como se los envia a los servicios. Y los servicio si saven que hacer con todos los parametros y los datos recibidos, y como devolverlos.

//NOTA: ahora en postman con las operaciones CRUD podremos verificar su funcionamiento sin problemas.

//NOTA: Aqui podemos encontrar los codigos de estatus de http catalogadas como information,redirects,successfull,       clientErrors,serverErrors. https://developer.mozilla.org/es/docs/Web/HTTP/Status

// Ahora tenemos que exportarla, porque aquí estamos definiendo la ruta pero no la estamos usando
// en nuestra aplicación de express
module.exports = moviesApi;
