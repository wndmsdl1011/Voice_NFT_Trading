// 데이터베이스 조회, 사용자 생성 등 실제 데이터와 관련된 순수한 로직을 처리합니다.

const User = require('../models/User.model');

// X(트위터) 로그인 비즈니스 로직
async function processXLogin(profile) {
  const email = profile.emails[0].value;
  let user = await User.findOne({ email: email });

  if (user) {
    if (user.provider !== 'x') {
      throw new Error(`이미 ${user.provider}(으)로 가입된 계정입니다.`);
    }
    if (!user.xId) {
      user.xId = profile.id;
      await user.save();
    }
    return user;
  } else {
    const newUser = await User.create({
      email: email,
      username: profile.displayName,
      provider: 'x',
      xId: profile.id
    });
    return newUser;
  }
}

// 인스타그램 로그인 비즈니스 로직
async function processInstagramLogin(profile) {
  let user = await User.findOne({ instagramId: profile.id });
  if (user) {
    return { user, isNew: false };
  } else {
    return { user: null, isNew: true, profile };
  }
}



module.exports = {
  processXLogin,
  processInstagramLogin
};