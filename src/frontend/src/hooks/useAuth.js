import { useEffect, useCallback } from "react";
import { useAppContext } from "../contexts/AppContext";
import { isTokenValid, decodeToken } from "../utils/auth";
import apiService from "../services/api";

/**
 * JWT 토큰 기반 인증 상태 관리를 위한 커스텀 훅
 * AppContext에서 인증 관련 상태와 액션만 추출하여 제공
 */
export function useAuth() {
  const { user, isAuthenticated, isInitialized, logoutAction, setUser } =
    useAppContext();

  // JWT 토큰 자동 만료 체크 및 로그아웃
  const checkTokenExpiration = useCallback(() => {
    const token = apiService.getToken();

    if (token && !isTokenValid(token)) {
      console.warn("JWT 토큰이 만료되었습니다. 자동 로그아웃 처리합니다.");
      logoutAction();
      return false;
    }

    return !!token;
  }, [logoutAction]);

  // 토큰에서 사용자 정보 추출
  const getUserFromToken = useCallback(() => {
    const token = apiService.getToken();
    if (!token || !isTokenValid(token)) {
      return null;
    }

    return decodeToken(token);
  }, []);

  // 로그인 처리 (토큰 저장 및 사용자 정보 설정)
  const login = useCallback(
    async (token) => {
      try {
        // 토큰 유효성 검사
        if (!token || !isTokenValid(token)) {
          throw new Error("유효하지 않은 토큰입니다.");
        }

        // 토큰 저장
        apiService.setToken(token);

        // 서버에서 최신 사용자 정보 가져오기
        const userProfile = await apiService.auth.getProfile();

        if (userProfile && userProfile.user) {
          setUser(userProfile.user);
        } else if (userProfile && userProfile.success && userProfile.user) {
          setUser(userProfile.user);
        } else {
          // fallback: 토큰에서 사용자 정보 추출
          const tokenUser = getUserFromToken();
          setUser(tokenUser);
        }

        return true;
      } catch (error) {
        console.error("로그인 처리 실패:", error);
        apiService.removeToken();
        setUser(null);
        throw error;
      }
    },
    [setUser, getUserFromToken]
  );

  // 로그아웃 처리
  const logout = useCallback(() => {
    logoutAction();
  }, [logoutAction]);

  // 토큰 갱신 (리프레시 토큰이 있는 경우)
  const refreshToken = useCallback(async () => {
    try {
      // TODO: 백엔드에서 리프레시 토큰 API가 구현되면 여기서 호출
      // const response = await apiService.auth.refreshToken();
      // return login(response.token);

      console.warn("리프레시 토큰 기능이 아직 구현되지 않았습니다.");
      return false;
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      logout();
      return false;
    }
  }, [login, logout]);

  // 정기적으로 토큰 만료 체크 (5분마다)
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 5 * 60 * 1000); // 5분

    return () => clearInterval(interval);
  }, [isAuthenticated, checkTokenExpiration]);

  // 페이지 포커스 시 토큰 만료 체크
  useEffect(() => {
    const handleFocus = () => {
      if (isAuthenticated) {
        checkTokenExpiration();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [isAuthenticated, checkTokenExpiration]);

  return {
    // 상태
    user,
    isAuthenticated,
    isInitialized,
    isLoading: !isInitialized,

    // 액션
    login,
    logout,
    refreshToken,
    checkTokenExpiration,
    getUserFromToken,

    // 유틸리티
    hasRole: (role) => user?.roles?.includes(role) || false,
    hasPermission: (permission) =>
      user?.permissions?.includes(permission) || false,
    isEmailVerified: user?.emailVerified || false,
    isProfileComplete: user?.profileComplete || false,
  };
}

export default useAuth;
