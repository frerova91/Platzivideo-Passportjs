const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const UsersService = require('../../../services/users');
const { config } = require('../../../config');

passport.use(
  //como un constructor recibe 2 parametros el secret o key y de donde sacamos el jsonwebtoken.
  new Strategy(
    {
      secretOrKey: config.authJwtSecret, //llave secreta
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() //De donde sale
    },

    async function(tokenPayload, cb) {
      //instancia
      const usersService = new UsersService();
      try {
        const user = await usersService.getUser({ email: tokenPayload.email });

        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        // si existe el usuario eliminamos el password del user y regresar el user ademas un atributo scopes: desde tokenPayload.scopes para este caso.

        delete user.password;

        cb(null, { ...user, scopes: tokenPayload.scopes });
      } catch (error) {
        return cb(error);
      }
    }
  )
);
