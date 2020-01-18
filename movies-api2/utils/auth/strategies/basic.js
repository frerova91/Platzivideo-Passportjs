//----------librerias

const passport = require('passport');
//La estrategia
const { BasicStrategy } = require('passport-http');
//Manejo de errores
const boom = require('@hapi/boom');
//encriptando y verificacion
const bcrypt = require('bcrypt');

//----------librerias

//servicio
const UsersService = require('../../../services/users');

//Definicion de la estrategia para passport
passport.use(
  new BasicStrategy(async function(email, password, cb) {
    const userService = new UsersService();

    try {
      //Regresa user
      const user = await userService.getUser({ email });

      //No existe usuario
      if (!user) {
        return cb(boom.unauthorized(), false);
      }

      //Es similar ?
      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }

      //Borrando el passdord del objeto user asegurandonos de que no sea visible.
      delete user.password;

      //pasando el usuario
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);

//No es buena practica regresarle informacion al usuario muy datallada sobre si el usuario existe pero no se puedeconectar porque el password es incorrecto por ejemplo es mejor mostrar no autorizado, esto es una medida contra hakers mal intencionados.
