import React from "react";

interface PDropdownField {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

const DropdownField: React.FC<PDropdownField> = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  required,
}) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownField;
