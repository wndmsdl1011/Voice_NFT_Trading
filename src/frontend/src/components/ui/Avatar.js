import React from "react";
import styled from "styled-components";

const AvatarContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  overflow: hidden;
  background: #f3f4f6;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #10b981, #0891b2);
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
`;

function Avatar({ className = "", children, ...props }) {
  return (
    <AvatarContainer className={className} {...props}>
      {children}
    </AvatarContainer>
  );
}

function AvatarImg({ src, alt = "", ...props }) {
  return <AvatarImage src={src} alt={alt} {...props} />;
}

function AvatarFallbackComponent({ children, ...props }) {
  return <AvatarFallback {...props}>{children}</AvatarFallback>;
}

export {
  Avatar,
  AvatarImg as AvatarImage,
  AvatarFallbackComponent as AvatarFallback,
};
