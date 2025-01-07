import React from "react";

interface PInputField {
  label?: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<PInputField> = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  required,
}) => {
  return (
    <div className="input-container">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
