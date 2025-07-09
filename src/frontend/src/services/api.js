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
      console.log(`🌐 API 요청: ${config.method || "GET"} ${url}`);
      const response = await fetch(url, config);

      // 응답 상태 로깅
      console.log(
        `📡 API 응답 상태: ${response.status} ${response.statusText}`
      );

      let responseData;
      try {
        responseData = await response.json();
        console.log(`📦 API 응답 데이터:`, responseData);
      } catch (jsonError) {
        console.error("❌ JSON 파싱 실패:", jsonError);
        throw new Error(`서버 응답을 파싱할 수 없습니다. (${response.status})`);
      }

      if (!response.ok) {
        const errorMessage =
          responseData?.error || responseData?.message || "API request failed";
        throw new Error(errorMessage);
      }

      return responseData;
    } catch (error) {
      console.error("💥 API Error:", error);
      throw error;
    }
  }

  // GET 요청
  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: "GET" }, options);
  }

  // POST 요청
  async post(endpoint, data, options) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    });
  }

  // PUT 요청
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    });
  }

  // DELETE 요청
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { method: "DELETE" }, options);
  }

  // 인증 관련 API
  auth = {
    // Facebook 가입 완료
    completeKakao: (token, profileData) =>
      this.post("/api/auth/complete-profile", profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // ✅ 문자열로!
        },
      }),

    // ✅ 사용자 프로필 조회
    getProfile: () => this.get("/api/auth/profile"),

    // 프로필 업데이트 (bio 수정)
    updateProfile: (profileData) => this.put("/api/auth/profile", profileData),

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

  // NFT 관련 API
  nft = {
    // NFT 민팅 (이미지, 음성, 지갑주소, 제목 등 정보 전송)
    mint: async (nftData) => {
      const formData = new FormData();

      // 파일 데이터 추가
      if (nftData.image) {
        formData.append("image", nftData.image);
      }
      if (nftData.audio) {
        formData.append("audio", nftData.audio);
      }

      // 기타 정보 추가
      formData.append("title", nftData.title);
      formData.append("description", nftData.description || "");
      formData.append("walletAddress", nftData.walletAddress);
      formData.append("price", nftData.price || "0");

      return this.request("/api/nft/mint", {
        method: "POST",
        body: formData,
        headers: {
          // FormData 사용 시 Content-Type 헤더 제거 (브라우저가 자동 설정)
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
    },

    // NFT 목록 조회 (마켓플레이스용)
    getList: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString
        ? `/api/nft/list?${queryString}`
        : "/api/nft/list";
      return this.get(endpoint);
    },

    // 특정 NFT 상세 정보 조회 (토큰 ID로)
    getById: (tokenId) => this.get(`/api/nft/${tokenId}`),

    // 사용자별 NFT 목록 조회
    getByUser: (walletAddress) => this.get(`/api/nft/user/${walletAddress}`),

    // NFT 구매
    purchase: (tokenId, purchaseData) =>
      this.post(`/api/nft/${tokenId}/purchase`, purchaseData),

    // NFT 재판매 등록
    resell: (tokenId, resellData) =>
      this.post(`/api/nft/${tokenId}/resell`, resellData),
  };

  // TTS 관련 API
  tts = {
    // 음성 프롬프트 업로드
    uploadVoice: async (userId, audioFile) => {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("audio", audioFile);

      return this.request("/api/tts/upload-voice", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
    },

    // TTS 음성 생성
    generateSpeech: async (userId, text) => {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("text", text);

      return this.request("/api/tts/generate-speech", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
    },

    // 사용자 음성 모델 상태 확인
    getVoiceStatus: (userId) => this.get(`/api/tts/voice-status/${userId}`),

    // 파라미터 기반 음성 생성 (성별, 피치, 속도)
    generateVoice: (voiceParams) =>
      this.post("/api/tts/generate-voice", voiceParams),
  };
}

export default new ApiService();
