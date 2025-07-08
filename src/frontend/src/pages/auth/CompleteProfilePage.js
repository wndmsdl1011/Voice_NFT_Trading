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
import { useAppContext } from "../../contexts/AppContext";
import { useToast } from "../../hooks/useToast";
import apiService from "../../services/api";
import Web3 from 'web3';
import MyAudioNFT from '../../contracts/MyAudioNFT.json';
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
  const { setUser } = useAppContext();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingToken, setOnboardingToken] = useState(null);
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  useEffect(() => {
    const error = getErrorFromUrl();

    if (error) {
      showToast.error("인증 중 오류가 발생했습니다.");
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
      showToast.error("인증 토큰을 찾을 수 없습니다.");
      navigate("/login");
    }
  }, [navigate, showToast]);

  const handleSubmit = async () => {
    if (!onboardingToken) {
      showToast.error("인증 토큰이 없습니다.");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      // 🦊 메타마스크 연결
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const selectedWallet = accounts[0];
      if (!selectedWallet) {
        throw new Error("메타마스크 지갑 연결 실패");
      }

      // 🛠️ 스마트 컨트랙트 인스턴스 생성
      const instance = new web3.eth.Contract(contractABI, contractAddress);
      setAccount(selectedWallet);
      setContract(instance);

      console.log("카카오 프로필 완성 API 호출:", { onboardingToken, selectedWallet });

      // ✅ 카카오 프로필 등록 (지갑 주소만 포함)
      const response = await apiService.auth.completeKakao(onboardingToken, {
        walletAddress: selectedWallet,
      });

      // 🔑 로그인 토큰 저장
      if (response.token) {
        apiService.setToken(response.token);
      }

      setUser(response.user);

      showToast.success("회원가입이 완료되었습니다!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Profile completion error:", error);
      showToast.error(error.message || "회원가입 중 오류가 발생했습니다.");
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
