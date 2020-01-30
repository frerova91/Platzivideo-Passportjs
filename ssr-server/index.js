const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const boom = require('@hapi/boom');
const session = require('express-session');
const cookieParse = require('cookie-parser');
const axios = require('axios');

const { config } = require('./config/index');

const app = express();

// body parser
app.use(express.json());
app.use(helmet());
app.use(cookieParse());
app.use(session({ session: config.sessionSecret }));
app.use(passport.initialize()); //inicializando sesion
app.use(passport.session());

// Basic Strategy
require('./utils/auth/strategies/basic');

// Oauth Strategy
require('./utils/auth/strategies/oauth');

//Connect ID Strategy
require('./utils/auth/strategies/google');

// Twitter Strategy
require('./utils/auth/strategies/twitter');

//--------------- implementando las rurtas ------------------------

app.post('/auth/sign-in', async function(req, res, next) {
  passport.authenticate('basic', async function(error, data) {
    try {
      //esto lo que quiere decir es que si nuestra estrategia basic fallo manda un error.
      if (error || !data) {
        next(boom.unauthorized());
      }
      // eslint-disable-next-line no-console
      //console.log('...........', 'ERROR:', error, '...........');

      //De lo contrario todo bien, hacemos login
      req.login(data, { session: false }, async function(error) {
        // eslint-disable-next-line no-console
        console.log('...........', 'DATA:', data, '...........');

        if (error) {
          next(error);
        }

        const { token, ...user } = data;

        //Definiendo una cookie en el objeto request
        res.cookie('token', token, {
          httpOnly: !config.dev, //solo cuando estamos en produccion
          secure: !config.dev //debe correr por https
        });

        //entonces el proceso de sign-in en le render server, crea una cookie le introduce el token y como respuesta tambien regresa el usuario. Asi la SPA obtiene la info de user y el token.
        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post('/auth/sign-up', async function(req, res, next) {
  const { body: user } = req;

  try {
    await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: 'post',
      data: user
    });

    res.status(201).json({ massage: 'user created' });
  } catch (error) {
    next(error);
  }
});

/* app.get('/movies', async function(req, res, next) {}); */

app.post('/user-movies', async function(req, res, next) {
  try {
    const { body: userMovie } = req;
    const { token } = req.cookies;

    //al hacer sign-in guardamos en las cookies el token generado, apartir de alli las request tendran dicha info en la cookie en este caso sacamos ese token de la cookie para llamar al api.
    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies`,
      headers: { Authorization: `Bearer ${token}` }, //estrategia jwt de tipo bearer token. por eso lo enviamos asi
      method: 'post',
      data: userMovie
    });

    if (status !== 201) {
      return next(boom.badImplementation()); //error general
    }

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});
app.delete('/user-movies/:userMovieId', async function(req, res, next) {
  //A este endpoint no tenemos que pasarle autorizacion por postman ya que esta obteniendo el token por medio de la cookie
  try {
    const { userMovieId } = req.params;
    const { token } = req.cookies;

    //al hacer sign-in guardamos en las cookies el token generado, apartir de alli las request tendran dicha info en la cookie en este caso sacamos ese token de la cookie para llamar al api.
    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies/${userMovieId}`,
      headers: { Authorization: `Bearer ${token}` }, //estrategia jwt de tipo bearer token. por eso lo enviamos asi, nota Bearer ${token} debe estar separado cuidado con el formateo
      method: 'delete'
    });

    if (status !== 200) {
      return next(boom.badImplementation()); //error general
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

//GOOGLE

//Este endpoint que se encarga de empezar el proceso de autenticacion con google,Autenticación con Google usando OpenID Connect  nuestra implementación de autenticación con Google pero mucho más sencilla. la anterior las rutas estan en el archivo index-old para ejemplo, que eran de Google API para hacer autenticación con 0Auth 2.0.

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile', 'openid']
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  function(req, res, next) {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.cookie('token', token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.status(200).json(user);
  }
);

//TWITTER
app.get('/auth/twitter', passport.authenticate('twitter'));

app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { session: false }),
  async function(req, res, next) {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.cookie('token', token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.status(200).json(user);
  }
);

app.listen(config.port, function() {
  // eslint-disable-next-line no-console
  console.log(`Listening http://localhost:${config.port}`);
});

//este server funciona como un proxi todas las llamdas son llamadas al api server, al hacer sign in el token regresado se almacena en una cookie y de alli las otras rutas leen el token de esa cookie.

//NOTA: MUCHO CUIDADO CON LOS ESPACIOS CAUSAN MUCHOS PROBLEMAS SI ESTAN EN UN MAL LUGAR COMO:
// { Authorization: `Bearer${token}` } DEBE DE ESTAR SEPARADO BEARER DE ${TOKEN},
//DE IGUAL FORMA LAS PALABRAS COMO EN EL LOS HEADEARS SON RESERVADAS ASI QUE DEBEN SER EXACTAS.
