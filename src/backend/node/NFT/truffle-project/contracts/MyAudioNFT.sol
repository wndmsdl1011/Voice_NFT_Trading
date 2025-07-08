// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MyAudioNFT is ERC721Enumerable {
    struct NFT {
        uint256 id;
        string metadataCID;
        string audioCID;
        address owner;
    }

    uint256 public nextTokenId = 1;
    mapping(uint256 => NFT) private _nfts;

    event Minted(address indexed to, uint256 indexed tokenId); // ✅ 커스텀 이벤트

    constructor() ERC721("MyAudioNFT", "AUDIO") {}

    function mintNFT(
        string calldata metadataCID,
        string calldata audioCID
    ) external {
        uint256 tokenId = nextTokenId;
        nextTokenId++;

        _safeMint(msg.sender, tokenId);
        _nfts[tokenId] = NFT(tokenId, metadataCID, audioCID, msg.sender);

        emit Minted(msg.sender, tokenId); // ✅ emit 추가
    }

    function getNFT(uint256 tokenId) external view returns (NFT memory) {
        require(_exists(tokenId), "ERC721: query for nonexistent token");
        return _nfts[tokenId];
    }

    function getNFTsByOwner(address owner) external view returns (NFT[] memory) {
        uint256 count = balanceOf(owner);
        NFT[] memory result = new NFT[](count);
        for (uint256 i = 0; i < count; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(owner, i);
            result[i] = _nfts[tokenId];
        }
        return result;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721: query for nonexistent token");
        return string(abi.encodePacked("ipfs://", _nfts[tokenId].metadataCID));
    }

    function tokenAudioUrl(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "ERC721: query for nonexistent token");
        return string(abi.encodePacked("ipfs://", _nfts[tokenId].audioCID));
    }
}
