const assert = require('assert'); // nativa de node.js
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');

const { moviesMock } = require('../utils/mocks/movies');

describe('services - movies', function() {
  //incluyendo los servicios
  const MoviesServices = proxyquire('../services/movies', {
    '../lib/mongo': MongoLibMock
  });

  //instanci del servicio para usar la libreria de mongo
  const moviesService = new MoviesServices();

  describe('when getMovies method is called', async function() {
    //comprobando si llama a la libreria
    it('should call the getall MongoLib method', async function() {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of movies', async function() {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepEqual(result, expected);
    });
  });
});
//los metodos como deepEqual y stricEqual son o forman parte de metodos usados para comprobar hay que investigar mas.
