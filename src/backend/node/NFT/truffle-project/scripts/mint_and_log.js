const MyAudioNFT = artifacts.require("MyAudioNFT");

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const me = accounts[0]; // 민팅할 계정

    // ✅ 입력할 CID (파일마다 교체)
    const metadataCID = "bafkreiaalno2knw4qykuaafvy462bhafnxjbt55qt2erpjgmgknvxaxy2a";
    const audioCID = "bafkreibbp6ebtw7w2fu43s7mv3gxvxcdvgd2zydu2mygo76ol3pohacixu";

    const instance = await MyAudioNFT.deployed();
    const result = await instance.mintNFT(metadataCID, audioCID, { from: me });

    const txHash = result.tx;
    const receipt = result.receipt;
    const event = result.logs[0];

    const tokenId = event.args.tokenId.toString();
    const fromAddress = event.args.from;
    const toAddress = event.args.to;

    console.log("\n✅ NFT Minted Successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Tx Hash:        ", txHash);
    console.log("Block Number:   ", receipt.blockNumber);
    console.log("Gas Used:       ", receipt.gasUsed);
    console.log("Status:         ", receipt.status ? "Success" : "Failed");
    console.log("Token ID:       ", tokenId);
    console.log("From (mint):    ", fromAddress);
    console.log("To (owner):     ", toAddress);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    callback();
  } catch (err) {
    console.error("❌ Error minting NFT:", err);
    callback(err);
  }
};
