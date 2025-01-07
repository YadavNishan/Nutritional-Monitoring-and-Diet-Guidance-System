import React from "react";
import { capitalizeFirstLetter, formatString } from "../../utils/randomUtils";

interface PSelectedField {
  options: string[];
  selectedOption: string;
  onChange: (value: string) => void;
}

const SelectedField: React.FC<PSelectedField> = ({
  options,
  selectedOption,
  onChange,
}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onChange(option)}
          className={`my-2 w-[200px] rounded-md py-3 text-center text-black ${
            selectedOption === option
              ? "border-[1px] border-green-400 text-black"
              : "hover:bg-gray-100"
          }`}
        >
          {capitalizeFirstLetter(formatString(option))}
        </button>
      ))}
    </div>
  );
};

export default SelectedField;
