import axios from 'axios';

const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.REACT_APP_PINATA_SECRET_API_KEY;

export const uploadToPinata = async (file) => {
  const data = new FormData();
  data.append('file', file);
  const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
    headers: {
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY
    }
  });
  return res.data.IpfsHash;
};

export const uploadMetadataToPinata = async (metadata) => {
  const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
    headers: {
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
      'Content-Type': 'application/json'
    }
  });
  return res.data.IpfsHash;
};
