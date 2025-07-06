// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MyAudioNFT is ERC721Enumerable {
    // NFT 메타데이터 구조체 (CID 저장)
    struct NFT {
        uint256 id;
        string metadataCID;
        string audioCID;
        address owner;
    }

    // 다음 발행할 토큰 ID (자동 증가)
    uint256 public nextTokenId = 1;

    // 토큰 ID → NFT 구조체 매핑
    mapping(uint256 => NFT) private _nfts;

    /**
     * @dev 컨트랙트 배포 시 토큰 이름(name)과 심볼(symbol) 설정
     */
    constructor() ERC721("MyAudioNFT", "AUDIO") {}

    /**
     * @dev 새 Audio NFT 민팅
     * @param metadataCID IPFS 메타데이터 CID (예: bafybeib...)
     * @param audioCID IPFS 오디오 파일 CID (예: bafybeiaudio...)
     */
    function mintNFT(
        string calldata metadataCID,
        string calldata audioCID
    ) external {
        uint256 tokenId = nextTokenId;
        nextTokenId++;

        // 안전하게 토큰 발행
        _safeMint(msg.sender, tokenId);

        // NFT 구조체에 CID 저장
        _nfts[tokenId] = NFT(tokenId, metadataCID, audioCID, msg.sender);
    }

    /**
     * @dev 단일 Audio NFT 정보 조회
     */
    function getNFT(
        uint256 tokenId
    ) external view returns (NFT memory) {
        require(_exists(tokenId), "ERC721: query for nonexistent token");
        return _nfts[tokenId];
    }

    /**
     * @dev 소유자별 보유 Audio NFT 리스트 조회
     */
    function getNFTsByOwner(
        address owner
    ) external view returns (NFT[] memory) {
        uint256 count = balanceOf(owner);
        NFT[] memory result = new NFT[](count);
        for (uint256 i = 0; i < count; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(owner, i);
            result[i] = _nfts[tokenId];
        }
        return result;
    }

    /**
     * @dev ERC-721 표준 메타데이터 URI 조회 (prefix 자동 추가)
     */
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721: query for nonexistent token");
        return string(abi.encodePacked("ipfs://", _nfts[tokenId].metadataCID));
    }

    /**
     * @dev 오디오 파일 URI 조회 (prefix 자동 추가)
     */
    function tokenAudioUrl(
        uint256 tokenId
    ) external view returns (string memory) {
        require(_exists(tokenId), "ERC721: query for nonexistent token");
        return string(abi.encodePacked("ipfs://", _nfts[tokenId].audioCID));
    }
}
