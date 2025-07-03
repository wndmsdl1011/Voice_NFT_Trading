module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",  // Ganache의 기본 주소
      port: 7545,         // Ganache의 기본 포트
      network_id: "5777", // Ganache에서 사용하는 network_id (1337)
      from: "0xCcc034f7a5a80c44D8450572366f4d46f388BE22", // Ganache에서 제공된 배포자의 주소
      gas: 6721975,       // 충분한 가스 한도 설정
      gasPrice: 20000000000, // 가스 가격 (20 Gwei)
    },
  },

  compilers: {
    solc: {
      version: "^0.8.20",  // Solidity 버전
    },
  },
};
