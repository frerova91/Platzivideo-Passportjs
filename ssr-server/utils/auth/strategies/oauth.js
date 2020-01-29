const passport = require('passport');
const boom = require('@hapi/boom');
const axios = require('axios');
const { OAuth2Strategy } = require('passport-oauth');

const { config } = require('../../../config/index');

//URLs del flujo de open authorization de google.
const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';

//Estrategia, el orden es muy importante.
const oAuth2Strategy = new OAuth2Strategy(
  {
    //constructor
    authorizationURL: GOOGLE_AUTHORIZATION_URL,
    tokenURL: GOOGLE_TOKEN_URL,
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: '/auth/google-oauth/callback'
  },
  async function(accessToken, refreshToken, profile, cb) {
    //esta es una funcion callback de la estrategia
    const { data, status } = await axios({
      url: `${config.apiUrl}/api/auth/sign-provider`,
      method: 'post',
      data: {
        //los profile los entrega google
        name: profile.name,
        email: profile.email,
        password: profile.id,
        apiKeyToken: config.apiKeyToken
      }
    });

    if (!data || status !== 200) {
      return cb(boom.unauthorized(), false);
    }

    return cb(null, data);
  }
);

//Aqui definimos como oauth definira nuestro profile
oAuth2Strategy.userProfile = function(accessToken, done) {
  this._oauth2.get(GOOGLE_USERINFO_URL, accessToken, (err, body) => {
    if (err) {
      return done(err);
    }

    try {
      const { sub, name, email } = JSON.parse(body);

      const profile = {
        id: sub,
        name,
        email
      };

      done(null, profile);
    } catch (parseError) {
      return done(parseError);
    }
  });
};

//indicandole el uso de la estrategia a passport
passport.use('google-oauth', oAuth2Strategy);
