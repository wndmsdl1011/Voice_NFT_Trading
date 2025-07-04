const passport = require('passport');

// passport.authenticate 래퍼 → error-first 스타일 유지
exports.authenticateOAuth = (provider) => (req, res, next) => {
  passport.authenticate(provider, { session: false }, (err, user, info) => {
    req.oauth = { err, user, info };
    next();
  })(req, res, next);
};
