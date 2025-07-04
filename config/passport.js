// src/config/passport.js

const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;
const XStrategy = require('passport-twitter-oauth2').Strategy;
const authService = require('../services/auth.service');

module.exports = function(passport) {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await require('../models/User').findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // --- Instagram Strategy ---
  passport.use(new InstagramStrategy({
      clientID: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      callbackURL: process.env.INSTAGRAM_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { user, isNew, profile: newProfile } = await authService.processInstagramLogin(profile);
        if (!isNew) {
          return done(null, user); // 기존 유저
        } else {
          return done(null, null, { profile: newProfile }); // 신규 유저
        }
      } catch (err) {
        return done(err);
      }
    }
  ));

  // --- X Strategy ---
  passport.use('x', new XStrategy({
      clientID: process.env.X_CLIENT_ID,
      clientSecret: process.env.X_CLIENT_SECRET,
      callbackURL: process.env.X_CALLBACK_URL,
      scope: ['users.read', 'tweet.read'], // 이메일 요청 스코프는 제거하지 않았지만, 이메일 동의를 받지 않을 거라면 'users.read'만으로도 충분할 수 있습니다.
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log('X OAuth 콜백 진입');
      console.log('profile:', profile);
      try {
        // profile.emails 확인 및 이메일 동의 요청 로직 삭제
        const user = await authService.processXLogin(profile);
        return done(null, user);
      } catch (err) {
        console.error('X OAuth 에러:', err);
        return done(err);
      }
    }
  ));
};