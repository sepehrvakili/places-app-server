// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else {
  require('dotenv').config({ path: './env/production.env' });
}

const FacebookTokenStrategy = require('passport-facebook-token');
const session = require('express-session');

module.exports = function passportConfig(app, passport) {
  app.use(session({ secret: 'fred', resave: false, saveUninitialized: false }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser((user, done) => done(null, user));

  passport.use(new FacebookTokenStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
  }, (accessToken, refreshToken, profile, done) => {
    /** this will be replaced with findOrCreate
    */
    const user = {
      email: profile.emails[0].value,
      name: `${profile.name.givenName} ${profile.name.familyName}`,
      id: profile.id,
      token: accessToken,
    };
    return done(null, user);
  }));
};
