// src/config/passport.config.js
require('dotenv').config({ path: __dirname + '/../.env' });
const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;
const authService = require('../services/auth.service');

module.exports = function (passport) {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await require('../models/User.model').findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // ✅ Instagram Strategy만 활성화
  passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: process.env.INSTAGRAM_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { user, isNew, profile: newProfile } = await authService.processInstagramLogin(profile);
      if (!isNew) {
        return done(null, user);
      } else {
        return done(null, null, { profile: newProfile });
      }
    } catch (err) {
      return done(err);
    }
  }));
};
