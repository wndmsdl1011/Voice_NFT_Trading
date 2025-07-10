import React from "react";
import styled from "styled-components";

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const LogoText = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  background: linear-gradient(to right, var(--emerald-600), var(--teal-600));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

const SoundMintLogo = ({ className }) => {
  return (
    <LogoContainer className={className}>
      <LogoIcon>
        <span>음</span>
      </LogoIcon>
      <LogoText>음성NFT</LogoText>
    </LogoContainer>
  );
};

export default SoundMintLogo; 