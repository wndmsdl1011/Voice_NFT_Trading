const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;
const XStrategy = require('passport-twitter-oauth2').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
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
        let user = await User.findOne({ instagramId: profile.id });
        if (user) {
          return done(null, user);
        } else {
          return done(null, null, { provider: 'instagram', profile });
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
      scope: ['users.read', 'tweet.read'], // X API는 이메일을 받기 위해 scope 명시가 중요
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.emails || !profile.emails[0].value) {
          return done(new Error('X 계정에 이메일 정보가 없거나, 정보 제공에 동의하지 않았습니다.'));
        }
        const email = profile.emails[0].value;
        let user = await User.findOne({ email: email });

        if (user) {
          if (user.provider !== 'x') {
            return done(new Error(`이미 ${user.provider}(으)로 가입된 계정입니다.`));
          }
          if (!user.xId) {
            user.xId = profile.id;
            await user.save();
          }
          return done(null, user);
        } else {
          const newUser = await User.create({
            email: email,
            username: profile.displayName,
            provider: 'x',
            xId: profile.id
          });
          return done(null, newUser);
        }
      } catch (err) {
        return done(err);
      }
    }
  ));
};