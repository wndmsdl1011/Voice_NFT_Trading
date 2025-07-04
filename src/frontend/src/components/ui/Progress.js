import React from "react";
import styled from "styled-components";

const ProgressContainer = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: var(--gray-200);
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(to right, var(--emerald-500), var(--teal-500));
  border-radius: 9999px;
  transition: width 0.3s ease-in-out;
  width: ${(props) => props.$value}%;
`;

const Progress = ({ value = 0, className = "", ...props }) => {
  return (
    <ProgressContainer className={className} {...props}>
      <ProgressBar $value={Math.min(100, Math.max(0, value))} />
    </ProgressContainer>
  );
};

export default Progress;
