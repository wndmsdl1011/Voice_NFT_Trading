# 🎤 Spark TTS - Voice NFT Marketplace

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat&logo=react&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled_Components-6.1.8-DB7093?style=flat&logo=styled-components&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.8.1-CA4245?style=flat&logo=react-router&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

> 🚀 **AI 기반 음성 NFT 생성 및 거래 플랫폼**  
> React 19의 최신 기능을 활용한 모던 웹 애플리케이션

## 📋 프로젝트 개요

Spark TTS는 사용자가 음성을 NFT로 생성하고 거래할 수 있는 혁신적인 마켓플레이스입니다. React 19의 최신 기능들을 활용하여 AI 기술과 블록체인 기반 NFT 거래를 제공합니다.

### ✨ 주요 기능

- 🎯 **AI 음성 생성**: 고품질 TTS 기술로 음성 NFT 생성
- 🛒 **NFT 마켓플레이스**: 음성 NFT 구매, 판매, 경매
- 👤 **사용자 프로필**: 개인 컬렉션 및 거래 내역 관리
- 🔐 **지갑 연동**: MetaMask 등 다양한 암호화폐 지갑 지원
- 📱 **반응형 디자인**: 모바일 및 데스크톱 최적화

### 🆕 React 19 새로운 기능 활용

- **⚡ Actions & Form Actions**: 서버 액션과 폼 처리 최적화
- **🔄 useOptimistic**: 낙관적 UI 업데이트로 즉각적인 반응성
- **⏳ useTransition**: 비동기 상태 전환 관리
- **🎯 useDeferredValue**: 검색 및 필터링 성능 최적화
- **🧩 Context as Provider**: 간소화된 컨텍스트 API
- **🧹 Ref Cleanup Functions**: 메모리 누수 방지
- **⚠️ Enhanced Error Handling**: 세분화된 에러 처리

## 🛠 기술 스택

### Frontend

- **React 19** - 최신 기능을 활용한 컴포넌트 기반 UI
- **Styled Components 6** - CSS-in-JS 스타일링
- **React Router 6** - SPA 라우팅
- **Lucide React** - 모던 아이콘 세트

### React 19 Features

- **Actions**: 서버 액션 및 폼 처리
- **useOptimistic**: 낙관적 업데이트
- **useTransition**: 상태 전환 관리
- **useDeferredValue**: 성능 최적화
- **Enhanced Context**: 간소화된 Provider
- **Ref Cleanup**: 메모리 관리

### Tools & Build

- **React Scripts 5** - 개발 환경 설정
- **ESLint** - 코드 품질 관리

## �� 시작하기

### 사전 요구사항

- Node.js 16.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/wndmsdl1011/Voice_NFT_Trading.git
cd Voice_NFT_Trading

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

개발 서버가 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build
```

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── layout/         # 레이아웃 컴포넌트 (Header, Footer)
│   └── ui/             # 기본 UI 컴포넌트 (Button, Card, Input)
├── contexts/           # React 19 Context API
│   └── AppContext.js   # 전역 상태 관리 (useOptimistic 활용)
├── pages/              # 페이지 컴포넌트
├── styles/             # 전역 스타일
└── App.js              # 메인 앱 컴포넌트
```

## 🎨 주요 페이지

| 페이지        | 설명                       | React 19 기능                 |
| ------------- | -------------------------- | ----------------------------- |
| 🏠 Home       | 랜딩 페이지 및 서비스 소개 | Enhanced Error Handling       |
| 🛍 Marketplace | NFT 탐색 및 구매           | useDeferredValue              |
| ✏️ Create     | 새로운 음성 NFT 생성       | useOptimistic, Actions        |
| 👤 Profile    | 사용자 프로필 및 컬렉션    | useTransition                 |
| 🔑 Login      | 소셜 로그인 및 지갑 연결   | Form Actions, 글래스모피즘 UI |

## 🔧 React 19 기능 상세

### Actions & Form Actions

```javascript
// Form Action으로 지갑 연결 처리
const handleWalletConnect = async (formData) => {
  const walletType = formData.get("walletType");
  await connectWalletAction(walletType);
};

<form action={handleWalletConnect}>
  <button type="submit">지갑 연결</button>
</form>;
```

### useOptimistic Hook

```javascript
// 낙관적 업데이트로 즉시 UI 반영
const [optimisticNfts, addOptimisticNft] = useOptimistic(
  nfts,
  (currentNfts, newNft) => [...currentNfts, { ...newNft, isPending: true }]
);
```

### Enhanced Context

```javascript
// React 19: Context를 직접 Provider로 사용
return <AppContext value={value}>{children}</AppContext>;
```

### Error Handling

```javascript
const root = createRoot(container, {
  onUncaughtError: (error, errorInfo) => {
    console.error("Uncaught error:", error, errorInfo);
  },
  onCaughtError: (error, errorInfo) => {
    console.error("Caught error:", error, errorInfo);
  },
});
```

## 🔄 버전 히스토리

- **v1.1.0** - 로그인 페이지 UI/UX 대폭 개선
  - 🎨 모던한 글래스모피즘 디자인 적용
  - ✨ 부드러운 애니메이션 및 호버 효과 추가
  - 🔧 Lucide React 최신 버전 호환성 개선 (Twitter → X 아이콘)
  - 📱 반응형 레이아웃 및 가독성 최적화
  - 🎯 소셜 로그인 버튼 디자인 및 간격 조정
- **v1.0.0** - React 19 기반 초기 구현 완료
  - useOptimistic을 활용한 낙관적 업데이트
  - Form Actions로 지갑 연결 최적화
  - Enhanced Error Handling 적용
  - useDeferredValue로 검색 성능 개선
- **v0.1.0** - 프로젝트 셋업 및 기본 구조 구축

## 🔮 로드맵

- [ ] **React 19 Server Components** 도입
- [ ] **Suspense** 기반 데이터 로딩 최적화
- [ ] **use Hook** 활용한 비동기 처리 개선
- [ ] **Resource Preloading APIs** 성능 최적화
- [ ] **Custom Elements** 지원 확대

## 🤝 기여하기

1. 이 저장소를 Fork 합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'feat: Add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 📞 연락처

프로젝트 문의사항이 있으시면 이슈를 생성해 주세요.

---

⭐ 이 프로젝트가 유용하다면 별표를 눌러주세요!
