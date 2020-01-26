const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const axios = require('axios');
const { config } = require('../../../config/index');

passport.use(
  new BasicStrategy(async function(email, password, cb) {
    try {
      //haciendo un request a nuestro server-api
      const { data, status } = await axios({
        url: `${config.apiUrl}/api/auth/sign-in`,
        mathod: 'post',
        auth: {
          password,
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
