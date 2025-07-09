import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Loader } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import {
  getTokenFromUrl,
  getErrorFromUrl,
  getTokenFromUrlOrCookie,
  cleanUrl,
} from "../../utils/auth";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import apiService from "../../services/api";
import Web3 from "web3";
import MyAudioNFT from "../../contracts/MyAudioNFT.json";
const contractABI = MyAudioNFT.abi;
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    #f0fdfa 0%,
    #ffffff 35%,
    #f0f9ff 65%,
    #ecfdf5 100%
  );
  padding: 1rem;
`;

const CompleteCard = styled(Card)`
  max-width: 420px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.08);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
`;

const StyledInput = styled(Input)`
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  transition: border-color 0.2s;

  &:focus {
    border-color: #10b981;
    outline: none;
  }
`;

const SubmitButton = styled(Button)`
  margin-top: 1rem;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  background: linear-gradient(135deg, #10b981, #0891b2);
  color: white;
  border: none;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 25px -8px rgba(16, 185, 129, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingIcon = styled(Loader)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

function CompleteProfilePage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showSuccess, showError } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingToken, setOnboardingToken] = useState(null);
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  useEffect(() => {
    const error = getErrorFromUrl();

    if (error) {
      showError("인증 중 오류가 발생했습니다.");
      navigate("/login");
      return;
    }

    // URL 파라미터와 쿠키 둘 다 확인 (온보딩 토큰의 경우 주로 URL에 있음)
    const token = getTokenFromUrl() || getTokenFromUrlOrCookie();
    console.log("온보딩 토큰 확인:", token);
    if (token) {
      setOnboardingToken(token);
    } else {
      console.error(
        "온보딩 토큰을 찾을 수 없습니다 - URL과 쿠키 모두 확인했음"
      );
      showError("인증 토큰을 찾을 수 없습니다.");
      navigate("/login");
    }
  }, [navigate, showError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!onboardingToken) {
      showError("인증 토큰이 없습니다.");
      navigate("/login");
      return;
    }

    // ✅ MetaMask 설치 여부 확인
    if (!window.ethereum) {
      showError("MetaMask가 설치되어 있지 않습니다.");
      console.error("🛑 window.ethereum 없음");
      return;
    }

    setIsLoading(true);

    try {
      // 🦊 MetaMask 연결 요청
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const walletAddress = accounts?.[0];

      if (!walletAddress) {
        throw new Error("메타마스크 지갑 연결 실패 (지갑 주소 없음)");
      }

      console.log("🦊 연결된 지갑 주소:", walletAddress);

      // ✅ web3 인스턴스 및 컨트랙트 연결 (선택)
      const web3Instance = new Web3(window.ethereum);
      const contractInstance = new web3Instance.eth.Contract(
        contractABI,
        contractAddress
      );

      // 상태 저장
      setWeb3(web3Instance);
      setAccount(walletAddress);
      setContract(contractInstance);

      // ✅ API 요청
      console.log("📡 completeKakao API 요청:", {
        onboardingToken,
        walletAddress,
      });

      const response = await apiService.auth.completeKakao(onboardingToken, {
        walletAddress,
      });

      console.log("✅ API 응답:", response);

      // 응답 검증 - response가 없거나 success가 명시적으로 false인 경우 에러 처리
      if (!response) {
        throw new Error("서버에서 응답을 받지 못했습니다.");
      }

      if (response.success === false) {
        const message =
          response.error ||
          response.message ||
          "회원가입 중 오류가 발생했습니다.";
        throw new Error(message);
      }

      // 성공 응답 처리 - success가 true이거나 undefined인 경우 성공으로 간주
      if (response.token) {
        // useAuth 훅의 login 메서드 사용 (토큰 저장 및 사용자 정보 설정 포함)
        await login(response.token);
      } else if (response.user) {
        // 토큰 없이 사용자 정보만 있는 경우 (이미 로그인된 상태)
        console.warn(
          "토큰 없이 사용자 정보만 받음 - 이미 로그인된 상태일 수 있음"
        );
      }

      showSuccess("회원가입이 완료되었습니다!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Profile completion error:", error);
      let message = "회원가입 중 오류가 발생했습니다.";

      try {
        if (error?.code === 4001) {
          message = "MetaMask 연결이 거부되었습니다. 다시 시도해주세요.";
        } else if (typeof error === "string") {
          message = error;
        } else if (error && typeof error === "object" && error !== null) {
          if (error.message) {
            message = error.message;
          } else if (error.error) {
            message = error.error;
          } else {
            try {
              message = JSON.stringify(error);
            } catch (stringifyError) {
              console.error("JSON stringify 실패:", stringifyError);
              message = "알 수 없는 오류가 발생했습니다.";
            }
          }
        }
      } catch (msgError) {
        console.error("에러 메시지 처리 실패:", msgError);
        message = "알 수 없는 오류가 발생했습니다.";
      }

      showError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <CompleteCard>
        <Header>
          <Title>프로필 완성</Title>
          <Description>
            MetaMask와 연결하기 위해 버튼을 클릭해주세요
          </Description>
        </Header>

        <Form onSubmit={handleSubmit}>
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingIcon size={16} />
                처리 중...
              </>
            ) : (
              "가입 완료"
            )}
          </SubmitButton>
        </Form>
      </CompleteCard>
    </PageContainer>
  );
}

export default CompleteProfilePage;
