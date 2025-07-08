import React from "react";
import styled from "styled-components";
import { Instagram, Twitter, Facebook, Sparkles } from "lucide-react";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useToast } from "../../hooks/useToast";
import { startSocialLogin } from "../../utils/auth";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #f0fdfa 0%,
    #ffffff 35%,
    #f0f9ff 65%,
    #ecfdf5 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 50%,
        rgba(16, 185, 129, 0.05) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(6, 182, 212, 0.05) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 80%,
        rgba(34, 197, 94, 0.05) 0%,
        transparent 50%
      );
    pointer-events: none;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 420px;
  position: relative;
  z-index: 1;
`;

const LoginCard = styled(Card)`
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.02) 0%,
    rgba(6, 182, 212, 0.02) 100%
  );
  padding: 2.5rem 2rem 1.5rem;
  text-align: center;
  border-bottom: 1px solid rgba(16, 185, 129, 0.08);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const LogoIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #10b981, #0891b2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
  box-shadow: 0 8px 25px -8px rgba(16, 185, 129, 0.4);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, #10b981, #0891b2);
    border-radius: 14px;
    z-index: -1;
    opacity: 0.2;
  }
`;

const LogoText = styled.h1`
  font-size: 1.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, #065f46, #0e7490);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.025em;
`;

const WelcomeSection = styled.div`
  margin-bottom: 1rem;
`;

const WelcomeTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
  line-height: 1.3;
  letter-spacing: -0.025em;
`;

const WelcomeDescription = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
  font-weight: 500;
`;

const CardBody = styled.div`
  padding: 2rem;
`;

const SectionDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 1.5rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
  }
`;

const DividerText = styled.span`
  padding: 0 1.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #9ca3af;
  background: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SocialOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SocialButton = styled(Button)`
  width: 100%;
  justify-content: center;
  padding: 1rem 1.5rem;
  height: auto;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 12px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &.instagram {
    background: linear-gradient(
      45deg,
      #405de6 0%,
      #5851db 10%,
      #833ab4 20%,
      #c13584 40%,
      #e1306c 60%,
      #fd1d1d 80%,
      #f56040 90%,
      #ffdc80 100%
    );
    border: none;
    color: white;
    box-shadow: 0 4px 15px rgba(193, 53, 132, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(193, 53, 132, 0.4);
    }
  }

  &.twitter {
    background: #000000;
    border: none;
    color: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

    &:hover {
      background: #1a1a1a;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }
  }

  &.facebook {
    background: #1877f2;
    border: none;
    color: white;
    box-shadow: 0 4px 15px rgba(24, 119, 242, 0.3);

    &:hover {
      background: #166fe5;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(24, 119, 242, 0.4);
    }
  }
`;

const SocialIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(16, 185, 129, 0.1);
`;

const FooterText = styled.p`
  font-size: 0.75rem;
  color: #9ca3af;
  line-height: 1.5;
  font-weight: 500;
`;

const DecorationElement = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, #10b981, #0891b2);
  border-radius: 50%;
  opacity: 0.6;

  &.dot-1 {
    top: 20%;
    left: 15%;
    animation: float 3s ease-in-out infinite;
  }

  &.dot-2 {
    top: 60%;
    right: 20%;
    animation: float 3s ease-in-out infinite 1s;
  }

  &.dot-3 {
    bottom: 30%;
    left: 25%;
    animation: float 3s ease-in-out infinite 2s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

function LoginPage() {
  const { showLoginSuccess, showLoginError, showLoading, dismissById } =
    useToast();

  const handleSocialLogin = (platform) => {
    console.log(`${platform}으로 로그인 시도`);

    // 로딩 토스트 표시
    const loadingToastId = showLoading(`${platform}으로 로그인 중...`);

    try {
      // 백엔드 OAuth 엔드포인트로 리다이렉트
      const platformMap = {
        instagram: "instagram",
        twitter: "x",
        facebook: "kakao",
      };

      startSocialLogin(platformMap[platform] || platform);
    } catch (error) {
      dismissById(loadingToastId);
      showLoginError();
      console.error("소셜 로그인 오류:", error);
    }
  };

  return (
    <PageContainer>
      <DecorationElement className="dot-1" />
      <DecorationElement className="dot-2" />
      <DecorationElement className="dot-3" />

      <Container>
        <LoginCard>
          <CardHeader>
            <Logo>
              <LogoIcon>
                <Sparkles size={18} />
              </LogoIcon>
              <LogoText>음성NFT</LogoText>
            </Logo>

            <WelcomeSection>
              <WelcomeTitle>음성 NFT의 새로운 세계로</WelcomeTitle>
              <WelcomeDescription>
                블록체인 기반의 독특한 음성 컬렉션을 만나보세요
              </WelcomeDescription>
            </WelcomeSection>
          </CardHeader>

          <CardBody>
            <SectionDivider>
              <DividerText>소셜 로그인</DividerText>
            </SectionDivider>

            <SocialOptions>
              <SocialButton
                className="instagram"
                onClick={() => handleSocialLogin("instagram")}
              >
                <SocialIcon>
                  <Instagram />
                  Instagram으로 시작하기
                </SocialIcon>
              </SocialButton>

              <SocialButton
                className="twitter"
                onClick={() => handleSocialLogin("twitter")}
              >
                <SocialIcon>
                  <Twitter />X (Twitter)로 시작하기
                </SocialIcon>
              </SocialButton>

              <SocialButton
                className="facebook"
                onClick={() => handleSocialLogin("facebook")}
              >
                <SocialIcon>
                  <Facebook />
                  Facebook으로 시작하기
                </SocialIcon>
              </SocialButton>
            </SocialOptions>

            <Footer>
              <FooterText>
                로그인 시 <strong>이용약관</strong> 및{" "}
                <strong>개인정보처리방침</strong>에<br />
                동의하는 것으로 간주됩니다
              </FooterText>
            </Footer>
          </CardBody>
        </LoginCard>
      </Container>
    </PageContainer>
  );
}

export default LoginPage;
