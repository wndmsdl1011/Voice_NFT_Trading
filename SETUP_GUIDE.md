# 🎵 Voice NFT Trading - 설정 및 실행 가이드

## 📋 사전 요구사항

- Node.js 16.0 이상
- Python 3.8 이상
- MongoDB (로컬 또는 클라우드)
- Git

## 🚀 빠른 시작

### 1. 저장소 클론 및 이동

```bash
git clone <repository-url>
cd Voice_NFT_Trading
```

### 2. Spark-TTS 모델 다운로드

```bash
cd src/backend/Spark-TTS-main

# Python 의존성 설치
pip install -r requirements.txt
pip install huggingface_hub

# 모델 다운로드
python download_model.py
```

### 3. 백엔드 설정 (Express 서버)

```bash
cd src/backend/node

# 의존성 설치
npm install

# 환경 설정 파일 복사 및 수정
cp env.example .env
# .env 파일을 열어서 실제 값들로 수정

# 서버 실행
npm run dev
```

### 4. Flask TTS 서버 실행

```bash
cd src/backend/Spark-TTS-main

# Flask 서버 실행
python webui.py
```

### 5. 프론트엔드 설정

```bash
cd src/frontend

# 의존성 설치
npm install

# 환경 설정 파일 복사 및 수정
cp env.example .env
# .env 파일을 열어서 실제 값들로 수정

# 개발 서버 실행
npm start
```

## 🔧 서버 포트 정보

- **프론트엔드**: http://localhost:3000
- **Express API 서버**: http://localhost:3000 (백엔드)
- **Flask TTS 서버**: http://localhost:5000

## 📝 환경 설정 가이드

### Express 서버 (.env)

```env
MONGO_URI=mongodb://localhost:27017/voice_nft_trading
JWT_SECRET=your_super_secret_jwt_key
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CLIENT_SECRET=your_kakao_client_secret
FLASK_TTS_URL=http://localhost:5000
```

### 프론트엔드 (.env)

```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_PINATA_API_KEY=your_pinata_api_key
REACT_APP_PINATA_SECRET_API_KEY=your_pinata_secret_key
```

## 🧪 테스트 플로우

### 1. 음성 업로드 및 학습 테스트

1. 프론트엔드에서 CreatePage로 이동
2. 음성 파일 업로드 (30초 이상 권장)
3. AI 학습 진행 확인

### 2. TTS 생성 테스트

1. TTSPage로 이동
2. 텍스트 입력
3. 음성 생성 및 재생 확인

## 🛠️ 트러블슈팅

### Flask 서버 연결 오류

```bash
# Flask 서버가 실행 중인지 확인
curl http://localhost:5000/health

# 모델이 제대로 다운로드되었는지 확인
ls -la src/backend/Spark-TTS-main/pretrained_models/Spark-TTS-0.5B/
```

### Express 서버 오류

```bash
# MongoDB 연결 확인
mongosh

# 로그 확인
npm run dev
```

### 프론트엔드 오류

```bash
# 환경 변수 확인
echo $REACT_APP_API_URL

# 브라우저 콘솔에서 네트워크 탭 확인
```

## 📚 API 엔드포인트

### TTS API

- `POST /api/tts/upload-voice` - 음성 파일 업로드
- `POST /api/tts/generate-speech` - TTS 음성 생성
- `GET /api/tts/voice-status/:userId` - 음성 모델 상태 확인

### 인증 API

- `GET /api/auth/kakao` - 카카오 로그인
- `GET /api/auth/kakao/callback` - 카카오 콜백

## 🔄 개발 워크플로우

1. **음성 업로드**: 프론트엔드 → Express API → Flask TTS
2. **TTS 생성**: 프론트엔드 → Express API → Flask TTS
3. **NFT 민팅**: (향후 구현) 프론트엔드 → Express API → 스마트 컨트랙트

## 📞 도움이 필요하다면

- Express 서버 로그 확인: `cd src/backend/node && npm run dev`
- Flask 서버 로그 확인: `cd src/backend/Spark-TTS-main && python webui.py`
- 프론트엔드 로그 확인: 브라우저 개발자 도구 콘솔
