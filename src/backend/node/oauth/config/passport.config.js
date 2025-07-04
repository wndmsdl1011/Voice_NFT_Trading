// src/config/passport.js
require('dotenv').config({ path: __dirname + '/../.env' });
const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;
const XStrategy = require('passport-twitter-oauth2').Strategy;
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

  // --- Instagram Strategy ---
  // passport.use(new InstagramStrategy({
  //     clientID: process.env.INSTAGRAM_CLIENT_ID,
  //     clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
  //     callbackURL: process.env.INSTAGRAM_CALLBACK_URL
  //   },
  //   async (accessToken, refreshToken, profile, done) => {
  //     try {
  //       const { user, isNew, profile: newProfile } = await authService.processInstagramLogin(profile);
  //       if (!isNew) {
  //         return done(null, user); // 기존 유저
  //       } else {
  //         return done(null, null, { profile: newProfile }); // 신규 유저
  //       }
  //     } catch (err) {
  //       return done(err);
  //     }
  //   }
  // ));

  // --- X Strategy ---
  passport.use('x', new XStrategy({
    clientID: process.env.X_CLIENT_ID,
    clientSecret: process.env.X_CLIENT_SECRET,
    callbackURL: process.env.X_CALLBACK_URL,

    // 👇 명시적으로 올바른 URL 지정
    authorizationURL: 'https://twitter.com/i/oauth2/authorize',
    tokenURL: 'https://api.twitter.com/2/oauth2/token',

    scope: ['users.read', 'tweet.read'],
    passReqToCallback: true
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
      const user = await authService.processXLogin(profile);
      return done(null, user);
    } catch (err) {
      console.error('X OAuth 에러:', err);
      return done(err);
    }
  }));
};