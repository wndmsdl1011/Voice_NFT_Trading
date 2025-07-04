import React from "react";
import styled, { css } from "styled-components";

const getVariantStyles = (variant) => {
  switch (variant) {
    case "outline":
      return css`
        background-color: transparent;
        border: 1px solid var(--emerald-200);
        color: var(--emerald-700);

        &:hover {
          background-color: var(--emerald-50);
          border-color: var(--emerald-300);
        }
      `;

    case "ghost":
      return css`
        background-color: transparent;
        border: 1px solid transparent;
        color: var(--gray-600);

        &:hover {
          background-color: var(--gray-100);
          color: var(--gray-900);
        }
      `;

    case "destructive":
      return css`
        background: linear-gradient(to right, var(--rose-500), var(--rose-600));
        border: 1px solid transparent;
        color: var(--white);

        &:hover {
          background: linear-gradient(
            to right,
            var(--rose-600),
            var(--rose-700)
          );
        }
      `;

    default:
      return css`
        background: linear-gradient(
          to right,
          var(--emerald-500),
          var(--teal-600)
        );
        border: 1px solid transparent;
        color: var(--white);

        &:hover {
          background: linear-gradient(
            to right,
            var(--emerald-600),
            var(--teal-700)
          );
        }
      `;
  }
};

const getSizeStyles = (size) => {
  switch (size) {
    case "sm":
      return css`
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
      `;

    case "lg":
      return css`
        padding: 0.75rem 2rem;
        font-size: 1.125rem;
        line-height: 1.75rem;
      `;

    default:
      return css`
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
      `;
  }
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  white-space: nowrap;

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px var(--emerald-500);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
  ${({ $rounded }) =>
    $rounded === "full" &&
    css`
      border-radius: 9999px;
    `}
`;

const Button = ({
  children,
  variant = "default",
  size = "default",
  fullWidth = false,
  rounded,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      $fullWidth={fullWidth}
      $rounded={rounded}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
