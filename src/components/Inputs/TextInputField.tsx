import React from "react";

type TextInputProps = {
  labelVariant: string;
  containerVariant: string;
  inputVariant: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  minLength?: number;
  maxLength?: number;
  type: string;
  isDisabled?: boolean;
  hasError?: boolean;
  name: string;
  placeholder?: string;
}
const TextInputField = ({
  labelVariant,
  inputVariant,
  label,
  onChange,
  onBlur,
  minLength,
  maxLength,
  isDisabled,
  // hasError,
  name,
  placeholder,
  containerVariant,
  type
}: TextInputProps) => {
  return (
    <div className={`${containerVariant}`}>
      <div className="mb-2 block">
        <p className={`${labelVariant}`}>{label}</p>
      </div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`${inputVariant}`}
        disabled={isDisabled}
        maxLength={maxLength}
        minLength={minLength}
        onChange={onChange}
        onBlur={onBlur}

      />
    </div>
  );
};

export default TextInputField;
