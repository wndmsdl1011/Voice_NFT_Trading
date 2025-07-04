import React from "react";
import styled, { keyframes } from "styled-components";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    to bottom right,
    var(--emerald-50),
    var(--white),
    var(--teal-50)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const LoadingSpinner = styled.div`
  width: 4rem;
  height: 4rem;
  border: 4px solid var(--emerald-200);
  border-top: 4px solid var(--emerald-600);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 2rem;
`;

const LoadingText = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--emerald-600);
  margin-bottom: 1rem;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoadingDescription = styled.p`
  color: var(--gray-600);
  text-align: center;
  max-width: 400px;
`;

const LoadingDots = styled.span`
  &::after {
    content: "";
    animation: ${pulse} 1.5s ease-in-out infinite;
  }

  &::before {
    content: "로딩 중";
  }
`;

const LoadingPage = ({ message = "로딩 중입니다", description }) => {
  return (
    <PageContainer>
      <LoadingSpinner />
      <LoadingText>
        <LoadingDots />
      </LoadingText>
      {description && <LoadingDescription>{description}</LoadingDescription>}
    </PageContainer>
  );
};

export default LoadingPage;
