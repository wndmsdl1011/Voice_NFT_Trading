const { Web3 } = require("web3");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");

// Pinata 설정
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;
const PINATA_JWT = process.env.PINATA_JWT;

// 블록체인 설정
const WEB3_PROVIDER_URL =
  process.env.WEB3_PROVIDER_URL || "http://127.0.0.1:7545";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// 스마트 컨트랙트 ABI (간단화된 버전)
const CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "metadataCID", type: "string" },
      { internalType: "string", name: "audioCID", type: "string" },
    ],
    name: "mintNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

class NFTController {
  constructor() {
    this.web3 = new Web3(WEB3_PROVIDER_URL);
    this.contract = new this.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  }

  // Pinata에 파일 업로드
  async uploadToPinata(file) {
    try {
      const formData = new FormData();
      formData.append("file", fs.createReadStream(file.path), {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      const metadata = JSON.stringify({
        name: file.originalname,
        keyvalues: {
          uploadedBy: "VoiceNFT-Platform",
        },
      });
      formData.append("pinataMetadata", metadata);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxContentLength: Infinity,
          headers: {
            ...formData.getHeaders(),
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
          },
        }
      );

      return response.data.IpfsHash;
    } catch (error) {
      console.error("Pinata 업로드 오류:", error);
      throw new Error("IPFS 파일 업로드에 실패했습니다.");
    }
  }

  // 메타데이터를 Pinata에 업로드
  async uploadMetadataToPinata(metadata) {
    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.IpfsHash;
    } catch (error) {
      console.error("메타데이터 업로드 오류:", error);
      throw new Error("메타데이터 업로드에 실패했습니다.");
    }
  }

  // NFT 민팅
  async mintNFT(req, res) {
    try {
      const { title, description, walletAddress, price } = req.body;
      const audioFile = req.files?.audio?.[0];
      const imageFile = req.files?.image?.[0];

      if (!title || !audioFile || !walletAddress) {
        return res.status(400).json({
          error: "제목, 음성 파일, 지갑 주소가 필요합니다.",
        });
      }

      console.log("NFT 민팅 시작:", { title, walletAddress });

      // 1. 오디오 파일을 IPFS에 업로드
      const audioCID = await this.uploadToPinata(audioFile);
      console.log("오디오 IPFS 업로드 완료:", audioCID);

      // 2. 이미지 파일이 있으면 IPFS에 업로드
      let imageCID = null;
      if (imageFile) {
        imageCID = await this.uploadToPinata(imageFile);
        console.log("이미지 IPFS 업로드 완료:", imageCID);
      }

      // 3. 메타데이터 생성
      const metadata = {
        name: title,
        description: description || "",
        audio: `ipfs://${audioCID}`,
        ...(imageCID && { image: `ipfs://${imageCID}` }),
        attributes: [
          {
            trait_type: "Type",
            value: "Voice NFT",
          },
          {
            trait_type: "Creator",
            value: walletAddress,
          },
          ...(price && [
            {
              trait_type: "Price",
              value: price,
            },
          ]),
        ],
      };

      // 4. 메타데이터를 IPFS에 업로드
      const metadataCID = await this.uploadMetadataToPinata(metadata);
      console.log("메타데이터 IPFS 업로드 완료:", metadataCID);

      // 5. 스마트 컨트랙트 호출 (실제 민팅)
      if (PRIVATE_KEY && CONTRACT_ADDRESS) {
        try {
          const account =
            this.web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
          this.web3.eth.accounts.wallet.add(account);

          const gasEstimate = await this.contract.methods
            .mintNFT(metadataCID, audioCID)
            .estimateGas({ from: account.address });

          const tx = await this.contract.methods
            .mintNFT(metadataCID, audioCID)
            .send({
              from: account.address,
              gas: gasEstimate,
              gasPrice: await this.web3.eth.getGasPrice(),
            });

          console.log("NFT 민팅 트랜잭션 완료:", tx.transactionHash);

          // 업로드된 파일들 정리
          if (audioFile?.path && fs.existsSync(audioFile.path)) {
            fs.unlinkSync(audioFile.path);
          }
          if (imageFile?.path && fs.existsSync(imageFile.path)) {
            fs.unlinkSync(imageFile.path);
          }

          res.json({
            success: true,
            message: "NFT가 성공적으로 민팅되었습니다.",
            data: {
              transactionHash: tx.transactionHash,
              metadataCID,
              audioCID,
              imageCID,
              metadata,
            },
          });
        } catch (contractError) {
          console.error("스마트 컨트랙트 호출 오류:", contractError);
          res.status(500).json({
            error: "블록체인 민팅에 실패했습니다.",
            details: contractError.message,
          });
        }
      } else {
        // 스마트 컨트랙트 설정이 없는 경우 메타데이터만 반환
        res.json({
          success: true,
          message: "NFT 메타데이터가 생성되었습니다. (테스트 모드)",
          data: {
            metadataCID,
            audioCID,
            imageCID,
            metadata,
          },
        });
      }
    } catch (error) {
      console.error("NFT 민팅 오류:", error);

      // 파일 정리
      if (
        req.files?.audio?.[0]?.path &&
        fs.existsSync(req.files.audio[0].path)
      ) {
        fs.unlinkSync(req.files.audio[0].path);
      }
      if (
        req.files?.image?.[0]?.path &&
        fs.existsSync(req.files.image[0].path)
      ) {
        fs.unlinkSync(req.files.image[0].path);
      }

      res.status(500).json({
        error: error.message || "NFT 민팅 중 오류가 발생했습니다.",
      });
    }
  }

  // NFT 목록 조회 (예시)
  async getNFTList(req, res) {
    try {
      // 실제로는 데이터베이스나 블록체인에서 NFT 목록을 가져와야 함
      res.json({
        success: true,
        data: {
          nfts: [],
          total: 0,
        },
      });
    } catch (error) {
      console.error("NFT 목록 조회 오류:", error);
      res.status(500).json({
        error: "NFT 목록을 가져오는 중 오류가 발생했습니다.",
      });
    }
  }
}

const nftController = new NFTController();

module.exports = {
  mintNFT: (req, res) => nftController.mintNFT(req, res),
  getNFTList: (req, res) => nftController.getNFTList(req, res),
};
