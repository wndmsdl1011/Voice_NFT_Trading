import React, { useState } from 'react';
import { uploadToPinata, uploadMetadataToPinata } from '../utils/pinata';
import MyAudioNFT from '../contracts/MyAudioNFT.json';
import Web3 from 'web3';

const NFTMintingComponent = () => {
  const [file, setFile] = useState(null);
  const [nftName, setNftName] = useState('');
  const [status, setStatus] = useState('');

  const handleMint = async () => {
    if (!file || !nftName) return alert("파일과 이름 모두 필요합니다.");

    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(MyAudioNFT.abi, process.env.REACT_APP_CONTRACT_ADDRESS);

    setStatus("📤 Pinata에 파일 업로드 중...");
    const imageCid = await uploadToPinata(file);

    setStatus("🧾 메타데이터 생성 중...");
    const metadata = {
      name: nftName,
      image: `ipfs://${imageCid}`
    };
    const metadataCid = await uploadMetadataToPinata(metadata);

    setStatus("🚀 NFT 민팅 중...");
    await contract.methods.mintNFT(metadataCid, imageCid).send({ from: accounts[0] });

    setStatus("✅ 민팅 완료!");
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <input type="text" placeholder="NFT 이름" onChange={e => setNftName(e.target.value)} />
      <button onClick={handleMint}>민팅</button>
      <p>{status}</p>
    </div>
  );
};

export default NFTMintingComponent;
