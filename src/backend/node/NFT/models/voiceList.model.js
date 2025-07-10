// src/backend/node/voice_nft/models/voice_nft.model.js
const mongoose = require('mongoose');

const VoiceListSchema = new mongoose.Schema({
    tokenId: {
        type: String, // 블록체인에서 받는 토큰 ID
        required: true,
        unique: true,
        index: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    tags: {
        type: [String], // 문자열 배열
        required: false,
        index: true
    },
    price: {
        type: mongoose.Schema.Types.Decimal128, // 소수점 정확도를 위해 Decimal128 사용
        required: true
    },
    mint_date: {
        type: Date,
        default: Date.now, // 기본값으로 현재 시간 자동 설정
        index: true // 최신순 정렬을 위한 인덱스
    },
    likes_count: { // 인기순 정렬을 위한 좋아요 수 (다시 추가)
        type: Number,
        default: 0,
        index: true // 인덱스 추가
    },
    walletAddress: {
        type: String,
        required: true,
        index: true
    },
    imageCID: {
        type: String,
        required: true,
      },
      
}, {
    timestamps: true // createdAt, updatedAt 타임스탬프 자동 추가
});

// 제목 및 설명 필드에 대한 텍스트 인덱스 추가 (검색 기능에 활용)
VoiceListSchema.index({ title: 'text', description: 'text' });

const VoiceNFT = mongoose.model('VoiceNFT', VoiceListSchema);

module.exports = VoiceNFT;