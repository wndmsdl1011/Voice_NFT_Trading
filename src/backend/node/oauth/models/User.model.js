const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  provider: {
    type: String,
    required: true,
    enum: ["instagram", "x", "facebook"], // 지원하는 OAuth 제공자 목록
  },
  facebookId: {
    type: String,
    unique: true,
    sparse: true,
  },
  profileUrl: {
    // 👈 user_link에서 받아온 Facebook 프로필 URL
    type: String,
    trim: true,
    default: null,
  },
  walletAddress: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
