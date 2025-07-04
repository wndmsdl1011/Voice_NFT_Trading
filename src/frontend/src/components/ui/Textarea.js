import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 4rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  background-color: var(--white);
  color: var(--gray-900);
  transition: all 0.15s ease-in-out;
  resize: vertical;

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

const Textarea = React.forwardRef(
  (
    {
      placeholder = "",
      value,
      onChange,
      disabled = false,
      rows = 3,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <StyledTextarea
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={className}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
