import React from "react";

interface InputTextProps {
    type: string;
    defaultValue: string;
    updateType: "emailId" | "password"; // Explicitly define the allowed values
    containerStyle: string;
    labelTitle: string;
    updateFormValue: (args: { updateType: "emailId" | "password"; value: string }) => void;
}

const InputText: React.FC<InputTextProps> = ({
    type,
    defaultValue,
    updateType,
    containerStyle,
    labelTitle,
    updateFormValue,
}) => {
    return (
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className="label-text text-base-content">{labelTitle}</span>
            </label>
            <input
                type={type}
                defaultValue={defaultValue}
                onChange={(e) => updateFormValue({ updateType, value: e.target.value })}
                className="input input-bordered w-full"
            />
        </div>
    );
};

export default InputText;