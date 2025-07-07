const User = require("../models/User.model");

// ✅ X 로그인 제거

// ✅ Facebook 로그인 처리
async function processFacebookLogin(profile) {
  let user = await User.findOne({ facebookId: profile.id });
  if (user) {
    return { user, isNew: false };
  } else {
    return { user: null, isNew: true, profile };
  }
}

module.exports = {
  processFacebookLogin,
};
