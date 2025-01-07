import React from "react";
import useGettingStartedStore from "../../../hooks/store/gettingStarted.store";
import GettingStartedData from "../../../utils/json/gettingStartedData.json";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import SelectedField from "../SelectedField";
import {
  capitalizeFirstLetter,
  formatString,
} from "../../../utils/randomUtils";
import { useNavigate } from "react-router";

interface PGettingStartedForm {
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface PGettingStartedInputField {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GettingStartedInputField: React.FC<PGettingStartedInputField> = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="!flex !flex-row items-center justify-between overflow-clip">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-2/3 border-b-2 border-gray-300 p-3 outline-none focus:border-b-2 focus:border-primary focus:outline-none"
      />

      <label htmlFor={id} className="text-primary">
        {label}
      </label>
    </div>
  );
};

const GettingStartedForm: React.FC<PGettingStartedForm> = ({ onSubmit }) => {
  const navigate = useNavigate();

  const {
    gender,
    weight,
    height,
    age,
    activityLevel,
    currentStep,
    setGender,
    setWeight,
    setHeight,
    setAge,
    setActivityLevel,
    setStep,
    getAllData,
  } = useGettingStartedStore();

  const handleNextStep = () => setStep(currentStep + 1);
  const handlePreviousStep = () => setStep(currentStep - 1);

  const inputFields = [
    {
      step: 1,
      type: "dropdown" as const,
      label: "Gender",
      value: gender,
      check: "gender",
      onChange: setGender, // Use Zustand setter
      options: ["MALE", "FEMALE", "OTHER"],
    },
    {
      step: 2,
      type: "input" as const,
      label: "Years",
      value: age,
      check: "age",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setAge(e.target.value),
      inputType: "number",
    },
    {
      step: 3,
      type: "input" as const,
      label: "kg",
      value: weight,
      check: "weight",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setWeight(e.target.value),
      inputType: "number",
    },
    {
      step: 4,
      type: "input" as const,
      label: "cm",
      value: height,
      check: "height",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setHeight(e.target.value),
      inputType: "number",
    },
    {
      step: 5,
      type: "dropdown" as const,
      label: "Activity Level",
      value: activityLevel,
      check: "activityLevel",
      onChange: setActivityLevel, // Use Zustand setter
      options: [
        "SEDENTARY",
        "LIGHTLY_ACTIVE",
        "MODERATELY_ACTIVE",
        "VERY_ACTIVE",
        "SUPER_ACTIVE",
      ],
    },
  ];

  // Find the current field based on currentStep
  const currentField = inputFields.find((field) => field.step === currentStep);

  const currentFieldData = GettingStartedData.gettingStarted.find(
    (item) => item.for === currentField?.check,
  );

  if (!currentField) {
    return (
      <div>
        <div className="summary flex h-screen flex-col items-center justify-between">
          <div className="flex h-full w-full flex-col items-center justify-around py-5 font-nunito-sans text-[#6e7179]">
            <div className="mb-3 flex w-full items-center px-5">
              <button
                onClick={handlePreviousStep}
                className="hover:text-primary"
              >
                <FaAngleLeft />
              </button>
              <h2 className="w-full text-center text-xl font-bold text-black">
                Me
              </h2>
            </div>
            <div className="flex h-full w-full flex-col justify-around">
              <ul className="h-full w-full">
                <li className="flex w-full justify-between border-b-2 px-5 py-3 text-center font-dm-sans">
                  Gender{" "}
                  <span className="font-bold text-primary">
                    {capitalizeFirstLetter(gender)}
                  </span>
                </li>
                <li className="flex w-full justify-between border-b-2 px-5 py-3 text-center font-dm-sans">
                  Age{" "}
                  <span className="font-bold text-primary">{age} years</span>
                </li>
                <li className="flex w-full justify-between border-b-2 px-5 py-3 text-center font-dm-sans">
                  Weight{" "}
                  <span className="font-bold text-primary">{weight} kg</span>
                </li>
                <li className="flex w-full justify-between border-b-2 px-5 py-3 text-center font-dm-sans">
                  Height{" "}
                  <span className="font-bold text-primary">{height} cm</span>
                </li>
                <li className="flex w-full justify-between border-b-2 px-5 py-3 text-center font-dm-sans">
                  Activity Level{" "}
                  <span className="font-bold text-primary">
                    {formatString(activityLevel)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full">
            <div className="flex w-full items-center justify-between px-5 py-5 font-nunito-sans text-[#6e7179]">
              <button
                onClick={onSubmit}
                className="btn btn-primary w-full font-dm-sans text-lg text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form flex h-screen flex-col items-center !justify-between py-5">
      <div>
        {currentFieldData && (
          <div className="form-header mb-4 text-center">
            <h3 className="title">{currentFieldData.title}</h3>
            <p className="subtitle">{currentFieldData.subtitle}</p>
          </div>
        )}
      </div>
      <div className="form-body">
        <div className="form-container">
          {currentField.type === "dropdown" && (
            <SelectedField
              options={currentField.options}
              selectedOption={currentField.value} // Pass Zustand value
              onChange={currentField.onChange} // Update Zustand state
            />
          )}
          {currentField.type === "input" && (
            <GettingStartedInputField
              label={currentField.label}
              type={currentField.inputType}
              id={currentField.label.toLowerCase()}
              name={currentField.label.toLowerCase()}
              value={currentField.value}
              onChange={currentField.onChange}
            />
          )}
        </div>
      </div>

      <div className="flex w-full items-center justify-between px-5 py-5 font-nunito-sans text-[#6e7179]">
        {currentStep > 1 ? (
          <button onClick={handlePreviousStep} className="hover:text-primary">
            Back
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hover:text-primary"
          >
            Back to login.
          </button>
        )}
        {currentStep <= inputFields.length && (
          <button
            onClick={() => {
              handleNextStep();
              console.log(getAllData());
            }}
            className="cursor-pointer rounded-full bg-primary p-5 text-xl text-white"
          >
            <FaAngleRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default GettingStartedForm;
