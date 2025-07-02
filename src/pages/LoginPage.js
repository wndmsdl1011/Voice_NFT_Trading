import React from "react";
import styled from "styled-components";
import { Instagram, Twitter, Facebook } from "lucide-react";
import Button from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--emerald-50),
    var(--white),
    var(--teal-50)
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 1rem;
`;

const LoginCard = styled(Card)`
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const LogoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, var(--emerald-500), var(--teal-600));
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1rem;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--emerald-600), var(--teal-600));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const WelcomeText = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const WelcomeTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-800);
  margin-bottom: 0.5rem;
`;

const WelcomeDescription = styled.p`
  color: var(--gray-600);
  font-size: 0.875rem;
`;

const SocialOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SocialButton = styled(Button)`
  width: 100%;
  justify-content: center;
  padding: 1rem;
  height: auto;
  font-weight: 600;
  font-size: 0.875rem;

  &.instagram {
    background: linear-gradient(
      45deg,
      #405de6,
      #5851db,
      #833ab4,
      #c13584,
      #e1306c,
      #fd1d1d,
      #f56040,
      #f77737,
      #fcaf45,
      #ffdc80
    );
    border: none;
    color: white;

    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
  }

  &.twitter {
    background: #000000;
    border: none;
    color: white;

    &:hover {
      background: #333333;
      transform: translateY(-1px);
    }
  }

  &.facebook {
    background: #1877f2;
    border: none;
    color: white;

    &:hover {
      background: #166fe5;
      transform: translateY(-1px);
    }
  }
`;

const SocialIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

function LoginPage() {
  const handleSocialLogin = (platform) => {
    console.log(`${platform}으로 로그인 시도`);

    // OAuth 인증 URL 설정
    const authUrls = {
      instagram:
        "https://api.instagram.com/oauth/authorize?client_id=YOUR_INSTAGRAM_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user_profile,user_media&response_type=code",
      twitter:
        "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=YOUR_TWITTER_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=tweet.read%20users.read%20follows.read%20follows.write",
      facebook:
        "https://www.facebook.com/v18.0/dialog/oauth?client_id=YOUR_FACEBOOK_APP_ID&redirect_uri=YOUR_REDIRECT_URI&scope=email,public_profile&response_type=code",
    };

    // 개발 환경에서는 홈페이지로 리다이렉트 (실제 구현 시에는 위의 authUrls 사용)
    if (process.env.NODE_ENV === "development") {
      // 개발 환경에서는 바로 홈으로 이동
      window.location.href = "/";
    } else {
      // 실제 환경에서는 OAuth URL로 이동
      window.location.href = authUrls[platform];
    }
  };

  return (
    <PageContainer>
      <Container>
        <LoginCard>
          <CardContent style={{ padding: "2rem" }}>
            <Logo>
              <LogoIcon>음</LogoIcon>
              <LogoText>음성NFT</LogoText>
            </Logo>

            <WelcomeText>
              <WelcomeTitle>음성 NFT 수집과 생성을 위해</WelcomeTitle>
              <WelcomeTitle>로그인하세요</WelcomeTitle>
              <WelcomeDescription style={{ marginTop: "1rem" }}>
                블록체인에서 독특한 음성의 세계를 탐험해보세요
              </WelcomeDescription>
            </WelcomeText>

            <div style={{ margin: "2rem 0 1rem 0", textAlign: "center" }}>
              <p style={{ fontSize: "0.875rem", color: "var(--gray-600)" }}>
                소셜 계정으로 시작하기
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--gray-500)",
                  marginTop: "0.25rem",
                }}
              >
                선호하는 플랫폼을 선택해 빠르게 시작하세요
              </p>
            </div>

            <SocialOptions>
              <SocialButton
                className="instagram"
                onClick={() => handleSocialLogin("instagram")}
              >
                <SocialIcon>
                  <Instagram />
                  Instagram으로 계속하기
                </SocialIcon>
              </SocialButton>

              <SocialButton
                className="twitter"
                onClick={() => handleSocialLogin("twitter")}
              >
                <SocialIcon>
                  <Twitter />X (Twitter)로 계속하기
                </SocialIcon>
              </SocialButton>

              <SocialButton
                className="facebook"
                onClick={() => handleSocialLogin("facebook")}
              >
                <SocialIcon>
                  <Facebook />
                  Facebook으로 계속하기
                </SocialIcon>
              </SocialButton>
            </SocialOptions>

            <div
              style={{
                textAlign: "center",
                marginTop: "2rem",
                paddingTop: "2rem",
                borderTop: "1px solid var(--emerald-200)",
              }}
            >
              <p style={{ fontSize: "0.75rem", color: "var(--gray-500)" }}>
                로그인하면 이용약관과 개인정보처리방침에 동의하는 것으로
                간주됩니다
              </p>
            </div>
          </CardContent>
        </LoginCard>
      </Container>
    </PageContainer>
  );
}

export default LoginPage;
