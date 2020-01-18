//Romovemos los  Mocks
//Importamos la libreria de mongo que creamos.
const mongoLib = require('../lib/mongo');

//NOTA: getAll,get,create,update,delete probienen de la libreria de mongo

//Aqui es donde implementamos la capa de negocio los nombres deben de ser muy explicitos a lo que hacen
class MoviesServices {
  constructor() {
    this.collection = 'movies';
    this.mongoDB = new mongoLib();
  }
  async getMovies({ tags }) {
    //sintaxis que recibe mongo y quiere decir los tags: que esten dentro de los tags que estamos pasando.
    const query = tags && { tags: { $in: tags } };
    const movies = await this.mongoDB.getAll(this.collection, query);
    return movies || [];
  }
  async getMovie({ movieId }) {
    const movie = await this.mongoDB.get(this.collection, movieId);
    return movie || {};
  }
  async createMovie({ movie }) {
    const createMovieId = await this.mongoDB.create(this.collection, movie);
    return createMovieId;
  }
  async updateMovie({ movieId, movie } = {}) {
    const updateMovieId = await this.mongoDB.update(
      this.collection,
      movieId,
      movie
    );
    return updateMovieId;
  }
  async deleteMovie({ movieId }) {
    const deleteMovieId = await this.mongoDB.delete(this.collection, movieId);
    return deleteMovieId;
  }
}

module.exports = MoviesServices;
