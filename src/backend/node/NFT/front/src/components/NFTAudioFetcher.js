// src/NFTAudioFetcher.js

import React, { useState } from 'react';
import Web3 from 'web3';
import MyAudioNFT from './contracts/MyAudioNFT.json';

const NFTAudioFetcher = () => {
  const [tokenId, setTokenId] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchAudio = async () => {
    if (!tokenId) {
      alert('토큰 ID를 입력하세요.');
      return;
    }

    try {
      setLoading(true);
      const web3 = new Web3(window.ethereum);
      const netId = await web3.eth.net.getId();
      const contractAddress = MyAudioNFT.networks[netId]?.address;
      const contract = new web3.eth.Contract(MyAudioNFT.abi, contractAddress);

      const ipfsUrl = await contract.methods.tokenAudioUrl(tokenId).call();
      setAudioUrl(ipfsUrl);
    } catch (err) {
      console.error(err);
      alert('IPFS 주소 조회 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>🎧 NFT 오디오 IPFS 주소 조회</h3>
      <input
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <button onClick={handleFetchAudio} disabled={loading}>
        {loading ? '조회 중...' : '조회'}
      </button>
      {audioUrl && (
        <div>
          <p><strong>IPFS 주소:</strong> {audioUrl}</p>
          <a
            href={`https://ipfs.io/ipfs/${audioUrl.replace('ipfs://', '')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            브라우저에서 열기
          </a>
        </div>
      )}
    </div>
  );
};

export default NFTAudioFetcher;
