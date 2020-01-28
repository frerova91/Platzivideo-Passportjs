const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const axios = require('axios');
const { config } = require('../../../config/index');

passport.use(
  new BasicStrategy(async function(email, password, cb) {
    try {
      const { data, status } = await axios({
        //objeto de consifugracion de axiso
        url: `${config.apiUrl}/api/auth/sign-in`, //haciendo un request a nuestro server-api
        method: 'post',
        auth: {
          password: password,
          username: email
        },
        data: {
          apiKeyToken: config.apiKeyToken
        }
      });

      if (!data || status !== 200) {
        return cb(boom.unauthorized(), false);
      }

      return cb(null, data);
    } catch (error) {
      cb(error);
    }
  })
);
