const axios = require('axios');
const path = require('path');
const { exec } = require('child_process');

exports.mintNFT = (req, res) => {
    const rootPath = path.resolve(__dirname, '../');
    const trufflePath = path.join(rootPath, 'truffle-project');
    const frontendPath = path.join(rootPath, 'front/src/contracts');

    const command = `
        cd "${trufflePath}" && \
        truffle migrate --reset && \
        cp build/contracts/MyAudioNFT.json "${frontendPath}"
    `;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('❌ 배포 오류:', error);
            return res.status(500).json({
                error: '배포 실패',
                details: stderr.toString()
            });
        }

        console.log('✅ 배포 완료\n', stdout);
        return res.status(200).json({
            message: '✅ 자동 배포 및 ABI 복사 완료',
            stdout: stdout.toString()
        });
    });
};
