import apiService from "../services/api";

// URL에서 토큰 추출
export const getTokenFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("token");
};

// URL에서 에러 추출
export const getErrorFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("error");
};

// JWT 토큰 디코딩 (페이로드만)
export const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("토큰 디코딩 실패:", error);
    return null;
  }
};

// 토큰 유효성 검사
export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decoded = decodeToken(token);
    if (!decoded) return false;

    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

// 현재 사용자 정보 가져오기
export const getCurrentUser = () => {
  const token = apiService.getToken();
  if (!token || !isTokenValid(token)) {
    return null;
  }

  return decodeToken(token);
};

// 로그인 상태 확인
export const isAuthenticated = () => {
  const token = apiService.getToken();
  return token && isTokenValid(token);
};

// 로그아웃
export const logout = () => {
  apiService.removeToken();
  window.location.href = "/login";
};

// 소셜 로그인 시작
export const startSocialLogin = (provider) => {
  const loginUrl = apiService.getSocialLoginUrl(provider);
  window.location.href = loginUrl;
};

// URL 파라미터 정리
export const cleanUrl = () => {
  const url = new URL(window.location);
  url.searchParams.delete("token");
  url.searchParams.delete("error");
  window.history.replaceState({}, document.title, url.toString());
};
