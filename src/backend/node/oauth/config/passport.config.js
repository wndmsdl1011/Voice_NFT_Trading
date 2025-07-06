require('dotenv').config({ path: __dirname + '/../.env' });
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
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

  // ✅ Facebook Strategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'link']  // 👈 'link' 추가 필수
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("[STRATEGY] facebook callback 실행됨");
    try {
      const { user, isNew, profile: newProfile } = await authService.processFacebookLogin(profile); // 👈 함수명 수정
      if (!isNew) {
        return done(null, user);
      } else {
        return done(null, null, { profile: newProfile });
      }
    } catch (err) {
      console.error('[STRATEGY ERROR]', err);
      return done(err);
    }
  }));
};
