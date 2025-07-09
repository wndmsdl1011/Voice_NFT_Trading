#!/bin/bash

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Voice NFT Trading Platform - 서버 시작 스크립트${NC}"
echo "=================================================================="

# 1. 모델 다운로드 확인
echo -e "${YELLOW}1. Spark-TTS 모델 확인 중...${NC}"
if [ ! -d "pretrained_models/Spark-TTS-0.5B" ]; then
    echo -e "${RED}❌ Spark-TTS 모델이 없습니다. 다운로드를 시작합니다...${NC}"
    python download_model.py
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ 모델 다운로드에 실패했습니다.${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Spark-TTS 모델이 준비되었습니다.${NC}"
fi

# 2. Python 의존성 설치
echo -e "${YELLOW}2. Python 의존성 설치 중...${NC}"
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Python 의존성 설치에 실패했습니다.${NC}"
    exit 1
fi

# 3. Node.js 의존성 설치
echo -e "${YELLOW}3. Node.js 의존성 설치 중...${NC}"
cd ../node
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Node.js 의존성 설치에 실패했습니다.${NC}"
    exit 1
fi

# 4. 프론트엔드 의존성 설치
echo -e "${YELLOW}4. 프론트엔드 의존성 설치 중...${NC}"
cd ../../frontend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 프론트엔드 의존성 설치에 실패했습니다.${NC}"
    exit 1
fi

# 5. 서버 실행
echo -e "${GREEN}5. 서버 실행 중...${NC}"
echo "=================================================================="

# Flask TTS 서버 실행 (백그라운드)
echo -e "${BLUE}🔥 Flask TTS 서버 시작 (포트: 5000)${NC}"
cd ../backend/Spark-TTS-main
python flask_server.py &
FLASK_PID=$!

# 잠시 대기 (Flask 서버 초기화)
sleep 5

# Node.js 백엔드 서버 실행 (백그라운드)
echo -e "${BLUE}🔥 Node.js 백엔드 서버 시작 (포트: 3001)${NC}"
cd ../node
node server.js &
NODE_PID=$!

# 잠시 대기 (Node.js 서버 초기화)
sleep 3

# React 프론트엔드 서버 실행 (포그라운드)
echo -e "${BLUE}🔥 React 프론트엔드 서버 시작 (포트: 3000)${NC}"
cd ../../frontend
npm start &
REACT_PID=$!

echo "=================================================================="
echo -e "${GREEN}🎉 모든 서버가 시작되었습니다!${NC}"
echo ""
echo -e "${YELLOW}📋 서버 정보:${NC}"
echo "  - Flask TTS 서버:     http://localhost:5000"
echo "  - Node.js 백엔드:     http://localhost:3001"
echo "  - React 프론트엔드:   http://localhost:3000"
echo ""
echo -e "${YELLOW}🛑 서버 종료 방법:${NC}"
echo "  Ctrl+C를 눌러 모든 서버를 종료할 수 있습니다."
echo ""

# 종료 시그널 처리
trap 'echo -e "\n${RED}🛑 서버 종료 중...${NC}"; kill $FLASK_PID $NODE_PID $REACT_PID 2>/dev/null; exit 0' INT

# 무한 대기 (사용자가 Ctrl+C를 누를 때까지)
wait 