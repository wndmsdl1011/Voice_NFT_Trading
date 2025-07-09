// src/backend/node/voice_nft/services/voice_nft.service.js
const VoiceNFT = require('../models/voice_nft.model');
const mongoose = require('mongoose'); // Decimal128 타입 사용을 위해 임포트

// 클래스 대신 직접 함수를 exports 합니다.
exports.getVoiceNFTs = async ({ keyword, tags, minPrice, maxPrice, sortBy, sortOrder }) => {
    let query = {};
    let sortOptions = {};

    // 1. 키워드 검색 (제목 또는 설명)
    if (keyword) {
        query.$text = { $search: keyword };
    }

    // 2. 태그 필터링
    if (tags && tags.length > 0) {
        const tagArray = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
        query.tags = { $in: tagArray };
    }

    // 3. 가격 필터링
    if (minPrice !== undefined || maxPrice !== undefined) {
        query.price = {};
        if (minPrice !== undefined) {
            query.price.$gte = new mongoose.Types.Decimal128(String(minPrice));
        }
        if (maxPrice !== undefined) {
            query.price.$lte = new mongoose.Types.Decimal128(String(maxPrice));
        }
    }

    // 4. 정렬 옵션 설정 (최신순 또는 인기순)
    if (sortBy === 'mint_date') {
        sortOptions.mint_date = sortOrder === 'asc' ? 1 : -1;
    } else if (sortBy === 'likes_count') {
        sortOptions.likes_count = sortOrder === 'asc' ? 1 : -1;
    } else if (sortBy === 'price') { // ✨✨✨ price 정렬 로직 추가 ✨✨✨
        sortOptions.price = sortOrder === 'asc' ? 1 : -1;
    }
    else {
        // 기본 정렬: 최신순 (mint_date 내림차순)
        sortOptions.mint_date = -1;
    }
    
    try {
        const nfts = await VoiceNFT.find(query).sort(sortOptions);
        return nfts;
    } catch (error) {
        console.error("NFT 검색 중 오류 발생:", error);
        throw new Error(`NFT 검색에 실패했습니다: ${error.message}`);
    }
};

// 만약 이 서비스 파일에 다른 기능(예: NFT 생성)이 추가된다면,
// exports.createVoiceNFT = async (...) => { ... };
// 이런 식으로 다른 함수를 추가로 exports 할 수 있습니다.