const express = require('express');
const helmet = require('helmet');
const app = express();

//Variables de Entorno
const { config } = require('./config/index');

//-------------------- Middlewares -------------------------

//Rutas
const authApi = require('./routes/auth');
const moviesApi = require('./routes/movies');
const userMoviesApi = require('./routes/userMovies');

//Errors
const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

// body Parse, parsea los datos como json lo que permite interpretarlos.
app.use(express.json());
app.use(helmet());

//Using routes
moviesApi(app);
userMoviesApi(app);
authApi(app);

//Catch Error 404
app.use(notFoundHandler);

//Los middlewares de error siempre van despues que las rutas
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

//-------------------- Middlewares -------------------------

app.listen(config.port, function() {
  // eslint-disable-next-line no-console
  console.log(`Listening http://localhost:${config.port}`);
});
