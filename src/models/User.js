const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true,
  },
  provider: {
    type: String,
    required: true,
    enum: ['instagram', 'x']
  },
  instagramId: {
    type: String,
    unique: true,
    sparse: true
  },
  xId: {
    type: String,
    unique: true,
    sparse: true
  },
  walletAddress: {  // <-- ⭐️ 지갑 주소 필드 추가
    type: String,
    unique: true,   // 지갑 주소는 유일해야 함 (하나의 지갑 = 하나의 계정)
    sparse: true,   // null 값의 중복은 허용 (지갑을 아직 연결 안 한 사용자)
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);