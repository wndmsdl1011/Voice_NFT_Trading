const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // 토큰 가져오기
  getToken() {
    return localStorage.getItem("authToken");
  }

  // 토큰 설정
  setToken(token) {
    localStorage.setItem("authToken", token);
  }

  // 토큰 제거
  removeToken() {
    localStorage.removeItem("authToken");
  }

  // 기본 fetch 래퍼
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "API request failed");
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // GET 요청
  async get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  // POST 요청
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // PUT 요청
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // DELETE 요청
  async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }

  // 인증 관련 API
  auth = {
    // Facebook 가입 완료
    completeKakao: (token, profileData) =>
      this.post("/api/auth/kakao/complete-profile", profileData, {
        headers: { Authorization: `Bearer ${token}` },
      }),

    // ✅ 사용자 프로필 조회
    getProfile: () => this.get("/api/auth/profile"),

    // 로그아웃
    logout: () => {
      this.removeToken();
      return Promise.resolve();
    },
  };

  // JWT 토큰 디코딩 헬퍼
  decodeToken(token) {
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
  }

  // 소셜 로그인 URL 생성
  getSocialLoginUrl(provider) {
    return `${this.baseURL}/api/auth/${provider}`;
  }
}

export default new ApiService();
