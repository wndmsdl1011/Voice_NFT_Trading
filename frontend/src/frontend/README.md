# 🎵 Spark TTS WebApp

AI 기반 음성 NFT 생성 및 TTS(Text-to-Speech) 플랫폼입니다. 사용자는 자신의 음성을 AI로 학습시켜 독특한 음성 NFT를 생성하고, 이를 통해 텍스트를 자연스러운 음성으로 변환할 수 있습니다.

## ✨ 주요 기능

- 🎙️ **AI 음성 학습**: 사용자의 음성을 AI가 학습하여 개인화된 TTS 모델 생성
- 🖼️ **음성 NFT 생성**: 학습된 음성을 블록체인 기반 NFT로 민팅
- 🛒 **NFT 마켓플레이스**: 음성 NFT 거래 및 수집
- 🎯 **TTS 스튜디오**: 소유한 음성 NFT로 텍스트를 음성으로 변환
- 👤 **사용자 대시보드**: 개인 프로필 및 소유 NFT 관리

## 🏗️ 프로젝트 구조

```
src/
├── components/           # 재사용 가능한 컴포넌트
│   ├── layout/          # 레이아웃 컴포넌트 (Header, Footer)
│   ├── ui/              # 기본 UI 컴포넌트 (Button, Card, Input 등)
│   ├── common/          # 공통 컴포넌트
│   └── features/        # 기능별 컴포넌트
├── pages/               # 페이지 컴포넌트
│   ├── auth/           # 인증 관련 페이지
│   ├── marketplace/    # 마켓플레이스 관련 페이지
│   ├── dashboard/      # 대시보드 관련 페이지
│   ├── tts/           # TTS 스튜디오 관련 페이지
│   └── static/        # 정적 페이지 (About, FAQ 등)
├── hooks/              # 커스텀 React 훅
├── utils/              # 유틸리티 함수들
├── constants/          # 상수 정의
├── services/           # API 서비스
├── contexts/           # React Context
├── router/             # 라우팅 설정
└── styles/             # 글로벌 스타일
```

## 🚀 개선사항 (v2.0)

### �� 파일 구조 개선

- **모듈화된 페이지 구조**: 기능별로 페이지들을 폴더로 분리
- **라우팅 분리**: `src/router/index.js`로 라우팅 로직 분리
- **유틸리티 체계화**: hooks, utils, constants, services 폴더 추가

### 🔔 토스트 알림 시스템

- **react-hot-toast 라이브러리** 적용
- **커스텀 토스트 훅**: `useToast` 훅으로 일관된 알림 관리
- **사전 정의된 메시지**: 자주 사용하는 알림 메시지 상수화
- **Promise 기반 토스트**: 비동기 작업에 대한 로딩/성공/실패 상태 표시

### 🛠️ 개발자 경험 개선

- **상수 관리**: 라우트 경로 및 메시지 상수화
- **헬퍼 함수**: 날짜 포맷팅, 텍스트 처리, 로컬 스토리지 등
- **타입 안전성**: 향후 TypeScript 전환을 위한 구조 준비

## 🛠️ 기술 스택

- **Frontend**: React 19.0.0, styled-components
- **Routing**: React Router DOM v6
- **UI Components**: 커스텀 컴포넌트 라이브러리
- **Icons**: Lucide React
- **Notifications**: react-hot-toast
- **Build Tool**: Create React App

## 📦 설치 및 실행

### 전제 조건

- Node.js 16.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd spark-tts-webapp

# 의존성 설치
npm install --legacy-peer-deps

# 개발 서버 실행
npm start
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 파일 미리보기
npm run serve
```

## 🎯 사용 방법

### 1. 로그인

- 소셜 로그인 (Instagram, X/Twitter, Facebook) 지원
- 개발 환경에서는 자동으로 홈페이지로 리다이렉트

### 2. AI 음성 NFT 생성

1. **음성 업로드**: 최소 30초 이상의 음성 샘플 제공
2. **AI 학습**: 딥러닝 모델이 음성 특성 학습
3. **메타데이터 추가**: NFT 제목, 설명, 태그 등 설정
4. **NFT 민팅**: 블록체인에 음성 NFT 등록

### 3. TTS 스튜디오 사용

1. **음성 선택**: 소유한 음성 NFT 중 선택
2. **텍스트 입력**: 변환할 텍스트 작성 (최대 1000자)
3. **음성 생성**: AI가 텍스트를 선택한 음성으로 변환
4. **다운로드**: 생성된 음성 파일 저장

### 4. 마켓플레이스

- 다른 사용자의 음성 NFT 구매
- 자신의 음성 NFT 판매 및 재판매
- 음성 미리보기 및 상세 정보 확인

## 🔧 주요 컴포넌트

### Toast 시스템

```javascript
import { useToast } from "../hooks/useToast";

const { showSuccess, showError, showPromise } = useToast();

// 기본 사용법
showSuccess("성공적으로 저장되었습니다!");
showError("오류가 발생했습니다.");

// Promise 기반 토스트
showPromise(apiCall(), {
  loading: "처리 중...",
  success: "완료되었습니다!",
  error: "실패했습니다.",
});
```

### 라우팅

```javascript
import { ROUTES } from "../constants/routes";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
navigate(ROUTES.MARKETPLACE);
```

### 유틸리티 함수

```javascript
import {
  formatCurrency,
  truncateText,
  copyToClipboard,
} from "../utils/helpers";

const price = formatCurrency(1.5, "ETH"); // "1.5000 ETH"
const shortText = truncateText("긴 텍스트...", 20);
await copyToClipboard("복사할 텍스트");
```

## 🎨 디자인 시스템

- **색상**: Emerald/Teal 그라데이션 기반
- **타이포그래피**: 시스템 폰트 스택
- **컴포넌트**: Glassmorphism 디자인
- **반응형**: 모바일 우선 설계

## 🔄 버전 히스토리

### v2.0.0 (현재)

- 파일 구조 대대적 개선
- react-hot-toast 토스트 시스템 도입
- 라우팅 분리 및 상수 관리
- 유틸리티 함수 및 커스텀 훅 추가

### v1.1.0

- UI/UX 개선 (Glassmorphism 디자인)
- 로그인 페이지 개선
- 아이콘 호환성 문제 해결

### v1.0.0

- 기본 TTS 웹앱 구조
- NFT 생성 및 마켓플레이스 기능
- 기본 UI 컴포넌트 라이브러리

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이나 버그 리포트는 GitHub Issues를 통해 제출해 주세요.
