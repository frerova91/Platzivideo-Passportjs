const passport = require('passport');
const boom = require('@hapi/boom');
const axios = require('axios');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');

const { config } = require('../../../config/index');

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    async function(accessToken, refreshToken, { _json: profile }, done) {
      try {
        const { data, status } = await axios({
          url: `${config.apiUrl}/api/auth/sign-provider`,
          method: 'post',
          data: {
            name: profile.name,
            email: profile.email,
            password: profile.sub,
            apiKeyToken: config.apiKeyToken
          }
        });

        if (!data || status !== 200) {
          return done(boom.unauthorized(), false);
        }

        return done(null, data);
      } catch (error) {
        done(error);
      }
    }
  )
);
