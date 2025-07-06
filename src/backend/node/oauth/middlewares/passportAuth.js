const passport = require('passport');

// passport.authenticate 래퍼 → error-first 스타일 유지
exports.authenticateOAuth = (provider) => (req, res, next) => {
  console.log("[MIDDLEWARE] passport.authenticate 실행됨");
  console.log("[MIDDLEWARE] provider:", provider);
  console.log("[MIDDLEWARE] req.query:", req.query);
  console.log("[MIDDLEWARE] req.body:", req.body);
  passport.authenticate(provider, { session: false }, (err, user, info) => {
    req.oauth = { err, user, info };
    next();
  })(req, res, next);
};