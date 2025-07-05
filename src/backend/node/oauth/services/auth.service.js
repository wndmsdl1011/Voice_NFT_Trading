const User = require('../models/User.model');

// ✅ X 로그인 제거

// ✅ Instagram 로그인만 유지
async function processInstagramLogin(profile) {
  let user = await User.findOne({ instagramId: profile.id });
  if (user) {
    return { user, isNew: false };
  } else {
    return { user: null, isNew: true, profile };
  }
}

module.exports = {
  processInstagramLogin
};
