import React from "react";
import styled from "styled-components";

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
  border: 1px solid;
  background-color: var(--emerald-100);
  color: var(--emerald-700);
  border-color: var(--emerald-200);

  &:hover {
    background-color: var(--emerald-100);
  }
`;

const Badge = ({ children, className = "", ...props }) => {
  return (
    <StyledBadge className={className} {...props}>
      {children}
    </StyledBadge>
  );
};

export default Badge;
