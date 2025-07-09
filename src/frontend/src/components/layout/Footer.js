import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Github, Twitter, MessageCircle } from "lucide-react";
import { requireAuth } from "../../utils/auth";

const FooterContainer = styled.footer`
  background: linear-gradient(to right, #0f172a, #1f2937);
  border-top: 1px solid var(--teal-800);
  padding: 3rem 1rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoSection = styled.div`
  margin-bottom: 1rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const LogoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background: linear-gradient(to right, var(--emerald-500), var(--teal-600));
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);

  span {
    color: white;
    font-weight: bold;
    font-size: 0.875rem;
  }
`;

const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
`;

const FooterDescription = styled.p`
  color: var(--gray-300);
  font-size: 0.875rem;
`;

const FooterTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterListItem = styled.li`
  font-size: 0.875rem;
`;

const FooterLink = styled(Link)`
  color: var(--gray-300);
  text-decoration: none;
  transition: color 0.15s ease-in-out;

  &:hover {
    color: var(--emerald-400);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: var(--gray-300);
  transition: color 0.15s ease-in-out;

  &:hover {
    color: var(--emerald-400);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid var(--gray-700);
  margin-top: 2rem;
  padding-top: 2rem;
  text-align: center;
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  color: var(--gray-400);
`;

// Discord component (since lucide-react doesn't have Discord)
const DiscordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.197.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const Footer = () => {
  const navigate = useNavigate();

  const handleCreateClick = (e) => {
    e.preventDefault();
    if (requireAuth(navigate, "/create")) {
      navigate("/create");
    }
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (requireAuth(navigate, "/profile")) {
      navigate("/profile");
    }
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <LogoSection>
              <LogoContainer>
                <LogoIcon>
                  <span>음</span>
                </LogoIcon>
                <LogoText>음성NFT</LogoText>
              </LogoContainer>
              <FooterDescription>
                블록체인에서 독특한 음성을 소유하고 거래하세요
              </FooterDescription>
            </LogoSection>
          </FooterSection>

          <FooterSection>
            <FooterTitle>플랫폼</FooterTitle>
            <FooterList>
              <FooterListItem>
                <FooterLink to="/marketplace">마켓플레이스</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/create" onClick={handleCreateClick}>NFT 생성</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/profile" onClick={handleProfileClick}>내 프로필</FooterLink>
              </FooterListItem>
            </FooterList>
          </FooterSection>

          <FooterSection>
            <FooterTitle>지원</FooterTitle>
            <FooterList>
              <FooterListItem>
                <FooterLink to="/about">소개</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/faq">자주 묻는 질문</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/terms">이용약관</FooterLink>
              </FooterListItem>
            </FooterList>
          </FooterSection>

          <FooterSection>
            <FooterTitle>소셜</FooterTitle>
            <SocialLinks>
              <SocialLink href="#" aria-label="Twitter">
                <Twitter />
              </SocialLink>
              <SocialLink href="#" aria-label="Discord">
                <DiscordIcon />
              </SocialLink>
              <SocialLink href="#" aria-label="Github">
                <Github />
              </SocialLink>
              <SocialLink href="#" aria-label="Contact">
                <MessageCircle />
              </SocialLink>
            </SocialLinks>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>© 2024 음성NFT. 모든 권리 보유.</Copyright>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
