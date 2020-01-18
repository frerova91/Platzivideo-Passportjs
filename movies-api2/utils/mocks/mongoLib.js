//Como en las rutas qui lo que nos interesa es verificar es lo que va a devolver y no las librerias que llama porlo que vamos hacer mock a la libreria de mongo.

//Sinon permite haer struct o mocks, al crea un nuevo struc les inyecta unas propiedades para saber si fueron llamados o no, lo que nos permite saber si cuando el servicio fue ejecutado llamo este a los metodo de las librerias.
const sinon = require('sinon');

const { moviesMock, filteredMoviesMock } = require('./movies');

//Stubs
//Resolviendo algo determinado por .withArgs('algo').resolve('obteniendo')
const getAllStub = sinon.stub();
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

const createStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
};
