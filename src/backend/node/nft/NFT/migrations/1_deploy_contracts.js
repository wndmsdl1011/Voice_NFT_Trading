const Migrations = artifacts.require("Migrations");
const MyNFTs = artifacts.require("MyNFTs");  // MyNFTs.sol 계약 추가

module.exports = function (deployer) {
  deployer.deploy(Migrations)
    .then(() => {
      return deployer.deploy(MyNFTs);  // MyNFTs.sol 계약 배포
    });
};
