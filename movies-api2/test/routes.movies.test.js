// Es buena practica que estos archivos terminen en .test.js

//Assert se encarga de verificar si es verdad o no la comparacaion en los test
const assert = require('assert');
//Permite que al hacer un require en vez de traer el paquete real traiga un mock
const proxyquire = require('proxyquire');

//Traemos los mocks y el testServer
const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies.js');
const testServer = require('../utils/testServer');

describe('routes - movies', function() {
  //ruta interbenido por proxuquire
  const route = proxyquire('../routes/movies', {
    // Aqui remplasamos la ruta original : por los mocks que estamos usando
    '../services/movies': MoviesServiceMock
  });

  //usando la ruta modificada
  const request = testServer(route);

  //Describiendo los test
  describe('GET /movies', function() {
    it('should respond with status 200', function(done) {
      request.get('/api/movies').expect(200, done);
    });
    it('should respond with the list of movies', function(done) {
      request.get('/api/movies').end((err, res) => {
        //deepEqual es para comparar objetos en este caos es para el body
        assert.deepEqual(res.body, {
          data: moviesMock,
          massage: 'movies Listed'
        });

        done(); //finalizando mis Test
      });
    });
  });
});

//Los test nos ayudan a mantener el codigo y que si en un futuro hay cambios en le proyecto no rompamos nuestra aplicacion.
