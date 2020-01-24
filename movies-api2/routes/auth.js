//Podemos implementar recordar sesión  pero para ello hayq ue hacer modificaciones mas info en el docu del curso no lo hice por no velo necesario por eso no se ve reflejado despues del anterior commit.

const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom'); //manejo de errores
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');
const UsersServices = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');

const { createUserSchema } = require('../utils/schema/users');

const { config } = require('../config/index');

// Debemos hacer uso de nuestra Strategy Basic
require('../utils/auth/strategies/basic');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();
  const usersServices = new UsersServices();

  router.post('/sign-in', async (req, res, next) => {
    /** verificamos que del cuerpo venga un atributo que se llame apiKeyToken
     * este es el token que le vamos a pasar el Sign In para determinar que clase de permiso
     * vamos a firmar en el JWT que vamos a devolver
     */
    const { apiKeyToken } = req.body;
    //console.log(req);
    // verificamos si no existe el token
    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'), false);
    }

    // cuando ya tengamos el token, podemos implementar un custom Callback
    // se va ha encargar de ubicar a nuestro usuario en nuestro request.user,
    // en esté caso no nos interesa que úbique al usuario que encuentra en la ubicación basic
    // nosotros lo que queremos es que nos devuelva un JWT Firmado.
    passport.authenticate('basic', function(err, user) {
      // eslint-disable-next-line no-console
      //console.log(`---// THIS IS auth.js : user => ${user} //---`);
      try {
        if (err || !user) {
          next(
            boom.unauthorized(/*`ERR: => ${err}, USER: => ${user}` */),
            false
          );
        }

        // si exite el usuario, procedemos a implementar el req.login
        // vamos definir que no vamos a implementar una session
        // recibimos un error en caso de que exista
        req.login(user, { session: false }, async function(error) {
          if (error) {
            next(error);
          }

          // si no hay error procedemos a buscar nuestro API Key

          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

          if (!apiKey) {
            next(boom.unauthorized('apiKey'));
          }

          // teniendo en cuenta el API Key procedemos a construir nuestro JWT

          const { _id: id, name, email } = user;

          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes
          };

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m'
          });

          return res.status(200).json({ token, user: { id, name, email } });
        });
      } catch (err) {
        next(err);
      }
      // como es un custom Callback, debemos hace un Clousure con la firma de la ruta.
    })(req, res, next);
  });

  //En esta ruta el validationHandler se encarga de verificar que tengamos todos los parametros necesarios para crear los usuarios.
  router.post('/sign-up', validationHandler(createUserSchema), async function(
    req,
    res
  ) {
    const { body: user } = req;
    try {
      //enviando al servicio el usuario, el cual tomara el passqword y creara un hash para DB.
      const createUserId = await usersServices.createUser({ user });

      //codigo de http de creacion 201
      res.status(201).json({ data: createUserId, massage: 'user created' });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
}

module.exports = authApi;
