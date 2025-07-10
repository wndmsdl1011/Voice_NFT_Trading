const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // 공통
    provider: {
      type: String,
      enum: ["kakao", "naver", "google"],
      required: true,
    },
    nickname: String,
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },
    profileImage: String,

    // 각 플랫폼별 ID
    kakaoId: { type: String, unique: true, sparse: true },
    naverId: { type: String, unique: true, sparse: true },
    googleId: { type: String, unique: true, sparse: true },

    // 선택 정보
    walletAddress: { type: String, unique: true, sparse: true, trim: true },
    age: { type: Number },
    job: { type: String },
    voiceCategory: { type: String },

    // 기타
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
