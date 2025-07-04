import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  background-color: var(--white);
  border-radius: 0.5rem;
  border: 1px solid var(--gray-200);
  box-shadow: var(--shadow);
  transition: all 0.15s ease-in-out;

  &.hover-effect {
    &:hover {
      box-shadow: var(--shadow-xl);
      transform: scale(1.02);
    }
  }
`;

const StyledCardHeader = styled.div`
  padding: 1.5rem;
  padding-bottom: 0.5rem;
`;

const StyledCardTitle = styled.h3`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
`;

const StyledCardDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--gray-600);
`;

const StyledCardContent = styled.div`
  padding: 1.5rem;
  padding-top: 0;
`;

export const Card = ({
  children,
  className = "",
  hoverEffect = false,
  ...props
}) => {
  return (
    <StyledCard
      className={`${hoverEffect ? "hover-effect" : ""} ${className}`}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

export const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <StyledCardHeader className={className} {...props}>
      {children}
    </StyledCardHeader>
  );
};

export const CardTitle = ({ children, className = "", ...props }) => {
  return (
    <StyledCardTitle className={className} {...props}>
      {children}
    </StyledCardTitle>
  );
};

export const CardDescription = ({ children, className = "", ...props }) => {
  return (
    <StyledCardDescription className={className} {...props}>
      {children}
    </StyledCardDescription>
  );
};

export const CardContent = ({ children, className = "", ...props }) => {
  return (
    <StyledCardContent className={className} {...props}>
      {children}
    </StyledCardContent>
  );
};
