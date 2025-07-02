import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  background-color: var(--white);
  color: var(--gray-900);
  transition: all 0.15s ease-in-out;

  &::placeholder {
    color: var(--gray-500);
  }

  &:focus {
    outline: none;
    border-color: var(--emerald-400);
    box-shadow: 0 0 0 2px var(--emerald-100);
  }

  &:disabled {
    background-color: var(--gray-100);
    color: var(--gray-500);
    cursor: not-allowed;
  }
`;

const Input = React.forwardRef(
  (
    {
      type = "text",
      placeholder = "",
      value,
      onChange,
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <StyledInput
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={className}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
