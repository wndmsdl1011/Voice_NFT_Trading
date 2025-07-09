const express = require("express");
const multer = require("multer");
const path = require("path");
const nftController = require("../controllers/nft.controller");

const router = express.Router();

// Multer 설정 - NFT 파일 업로드용
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/nft/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "audio") {
    // 오디오 파일 검증
    if (file.mimetype.startsWith("audio/")) {
      cb(null, true);
    } else {
      cb(new Error("오디오 파일만 업로드 가능합니다."), false);
    }
  } else if (file.fieldname === "image") {
    // 이미지 파일 검증
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("이미지 파일만 업로드 가능합니다."), false);
    }
  } else {
    cb(new Error("지원하지 않는 파일 타입입니다."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB 제한
  },
});

// NFT 민팅 라우트
router.post(
  "/mint",
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  nftController.mintNFT
);

// NFT 목록 조회
router.get("/list", nftController.getNFTList);

// 특정 NFT 조회
router.get("/:tokenId", (req, res) => {
  res.json({
    message: "NFT 상세 조회 API (구현 예정)",
    tokenId: req.params.tokenId,
  });
});

// 사용자별 NFT 목록 조회
router.get("/user/:walletAddress", (req, res) => {
  res.json({
    message: "사용자별 NFT 목록 조회 API (구현 예정)",
    walletAddress: req.params.walletAddress,
  });
});

module.exports = router;
