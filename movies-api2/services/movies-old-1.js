const { moviesMock } = require('../utils/mocks/movies');

//Aqui es donde implementamos la capa de negocio los nombres deben de ser muy explicitos a lo que hacen
class MoviesServices {
  async getMovies() {
    const movies = await Promise.resolve(moviesMock);
    return movies || [];
  }
  async getMovie() {
    const movie = await Promise.resolve(moviesMock[0]);
    return movie || {};
  }
  async createMovie() {
    const createMovieId = await Promise.resolve(moviesMock[0].id);
    return createMovieId;
  }
  async updateMovie() {
    const updateMovieId = await Promise.resolve(moviesMock[0].id);
    return updateMovieId;
  }
  async partialUpdateMovie() {
    const updatedMovieId = await Promise.resolve(moviesMock[0].id);
    return updatedMovieId;
  }
  async deleteMovie() {
    const deleteMovieId = await Promise.resolve(moviesMock[0].id);
    return deleteMovieId;
  }
}

module.exports = MoviesServices;
