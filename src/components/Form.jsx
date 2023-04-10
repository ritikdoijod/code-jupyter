import React from "react";
import { twMerge } from "tailwind-merge";

const Form = ({ children, className, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={twMerge(
        `rounded-lg bg-theme-0 px-3 py-2 text-theme-700 dark:bg-theme-950 dark:text-theme-200 ${className}`
      )}
    >
      {children}
    </form>
  );
};

const Input = ({
  type,
  placeholder,
  value,
  id,
  name,
  onChange,
  className,
  autoFocus,
  onBlur,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      id={id}
      name={name}
      onChange={onChange}
      className={twMerge(`rounded-lg bg-transparent ${className}`)}
      autoFocus={autoFocus}
      onBlur={onBlur}
    />
  );
};

Form.Input = Input;

export default Form;
