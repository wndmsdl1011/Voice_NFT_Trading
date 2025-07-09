// mint-trigger.js
const { exec } = require('child_process');
const path = require('path');

const projectRoot = path.join(__dirname, '../../..'); // VOICE_NFT_TRADING 경로
const truffleDir = path.join(projectRoot, 'truffle-project');
const script = `
cd ${truffleDir} && \
truffle migrate --reset && \
cp build/contracts/MyAudioNFT.json ${projectRoot}/src/front/src/contracts/
`;

exec(script, (err, stdout, stderr) => {
  if (err) {
    console.error('❌ 스크립트 실행 중 오류:', err);
    process.exit(1);
  }
  console.log('✅ 자동 배포 및 ABI 복사 완료:\n', stdout);
});
