const voiceNFTService = require('../services/voiceList.service'); 

exports.getNFTs = async (req, res) => {
    try {
        const {
            keyword,
            tags,
            minPrice,
            maxPrice,
            sortBy,
            sortOrder,
        } = req.query;

        const queryOptions = {
            keyword,
            tags,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
            sortBy,
            sortOrder,
        };

        const nfts = await voiceNFTService.getVoiceNFTs(queryOptions);

        res.status(200).json(nfts);
    } catch (error) {
        console.error("❌ NFT 검색/조회 실패:", error);
        res.status(500).json({
            message: error.message || "NFT 검색/조회 실패",
        });
    }
};
