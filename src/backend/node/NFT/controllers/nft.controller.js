const axios = require('axios');

exports.mintNFT = (req, res) => {
    const rootPath = path.resolve(__dirname, '../../'); // VOICE_NFT_TRADING 루트
    const trufflePath = path.join(rootPath, 'truffle-project');
    const frontendPath = path.join(rootPath, 'src/front/src/contracts');

    const command = `
        cd "${trufflePath}" && 
        truffle migrate --reset && 
        cp build/contracts/MyAudioNFT.json "${frontendPath}"
    `;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('❌ 배포 오류:', error);
            return res.status(500).json({ error: '배포 실패', details: stderr });
        }
        console.log('✅ 배포 완료\n', stdout);
        return res.json({ message: '✅ 자동 배포 및 ABI 복사 완료', output: stdout });
    });
}; 
