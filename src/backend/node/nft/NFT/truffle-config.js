const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    // Ganache (로컬 네트워크)
    development: {
      host: "127.0.0.1",    // Ganache 서버 IP
      port: 7545,           // Ganache의 기본 포트
      network_id: "5777",   // Ganache 기본 네트워크 ID
      gas: 6721975,         // 가스 한도
      gasPrice: 20000000000 // 가스 가격 (옵션)
    },

    // Sepolia (Infura API를 통한 Sepolia 테스트넷)
    sepolia: {
      provider: function() {
        return new HDWalletProvider(
          "decorate page album green step pumpkin home dumb enough nothing syrup never",  // MetaMask 시드 문구
          `https://sepolia.infura.io/v3/5469602b75d64f01b100b8d01edf4336`  // Infura API 키
        );
      },
      network_id: 11155111,  // Sepolia 네트워크 ID (고유 ID)
      gas: 8000000,           // 가스 한도
      gasPrice: 20000000000   // 가스 가격 (옵션)
    }
  },

  // Solidity 컴파일러 설정
  compilers: {
    solc: {
      version: "0.8.13",  // 사용할 Solidity 버전
    }
  },

  // Etherscan API를 사용하여 스마트 계약을 자동으로 검증
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    etherscan: "SEPFH67NIRBXWADF9493BXMXWXYUEQ6NW3"  // Etherscan API 키
  }
};
