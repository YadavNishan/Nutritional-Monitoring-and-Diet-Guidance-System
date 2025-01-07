import React from "react";
import { useNavigate } from "react-router";
import { TRegisterFromValues } from "../../../types/credientials";
import InputField from "../InputField";

interface PRegisterForm {
  registerFormValues: TRegisterFromValues;
  setRegisterFormValues: React.Dispatch<
    React.SetStateAction<TRegisterFromValues>
  >;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterForm: React.FC<PRegisterForm> = ({
  registerFormValues,
  setRegisterFormValues,
  onSubmit,
}) => {
  const navigate = useNavigate();

  const inputFields = [
    {
      label: "Name:",
      type: "text",
      id: "name",
      name: "name",
      value: registerFormValues.name,
    },
    {
      label: "Email:",
      type: "email",
      id: "email",
      name: "email",
      value: registerFormValues.email,
    },
    {
      label: "Password:",
      type: "password",
      id: "password",
      name: "password",
      value: registerFormValues.password,
    },
    {
      label: "Confirm Password:",
      type: "password",
      id: "confirmPassword",
      name: "confirmPassword",
      value: registerFormValues.confirmPassword,
    },
  ];

  // Helper function to handle input changes
  const handleChange =
    (field: keyof TRegisterFromValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRegisterFormValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <form onSubmit={onSubmit} className="form-container">
      {inputFields.map((field) => (
        <InputField
          key={field.id}
          label={field.label}
          type={field.type}
          id={field.id}
          name={field.name}
          value={field.value}
          onChange={handleChange(field.name as keyof TRegisterFromValues)}
          required
        />
      ))}
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <button
          type="submit"
          className="btn btn-primary w-full font-dm-sans text-lg text-white"
        >
          Register
        </button>
        <div>
          <p className="text-center font-dm-sans text-[#6e7179]">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="px-2 text-primary underline-offset-2 hover:underline"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
