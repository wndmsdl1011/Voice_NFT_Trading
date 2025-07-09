const VoiceNFT = require('../models/voiceList.model');
const mongoose = require('mongoose');

exports.getVoiceNFTs = async ({
    keyword,
    tags,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
}) => {
    const query = {};
    const sortOptions = {};

    // 키워드 검색 (title, description 텍스트 인덱스 필요)
    if (keyword) {
        query.$text = { $search: keyword };
    }

    // 태그 필터링
    if (tags) {
        const tagArray = Array.isArray(tags)
            ? tags
            : tags.split(',').map((tag) => tag.trim());
        query.tags = { $in: tagArray };
    }

    // 가격 필터링
    if (minPrice !== undefined || maxPrice !== undefined) {
        query.price = {};
        if (minPrice !== undefined) {
            query.price.$gte = mongoose.Types.Decimal128.fromString(String(minPrice));
        }
        if (maxPrice !== undefined) {
            query.price.$lte = mongoose.Types.Decimal128.fromString(String(maxPrice));
        }
    }

    // 정렬 기준 설정
    switch (sortBy) {
        case 'mint_date':
            sortOptions.mint_date = sortOrder === 'asc' ? 1 : -1;
            break;
        case 'likes_count':
            sortOptions.likes_count = sortOrder === 'asc' ? 1 : -1;
            break;
        case 'price':
            sortOptions.price = sortOrder === 'asc' ? 1 : -1;
            break;
        default:
            sortOptions.mint_date = -1;
    }

    try {
        const nfts = await VoiceNFT.find(query).sort(sortOptions);
        return nfts;
    } catch (error) {
        console.error("❌ NFT 검색 중 오류 발생:", error);
        throw new Error("NFT 검색에 실패했습니다.");
    }
};
