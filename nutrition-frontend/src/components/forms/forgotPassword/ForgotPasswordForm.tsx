import React from "react";
import { useNavigate } from "react-router";
import InputField from "../InputField";

interface PForgotPasswordForm {
  forgotPasswordFormValues: {
    email: string;
  };
  setForgotPasswordFormValues: React.Dispatch<
    React.SetStateAction<{
      email: string;
    }>
  >;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ForgotPasswordForm: React.FC<PForgotPasswordForm> = ({
  onSubmit,
  forgotPasswordFormValues,
  setForgotPasswordFormValues,
}) => {
  const navigate = useNavigate();

  // Array of input field configurations
  const inputFields = [
    {
      label: "Email:",
      type: "text",
      id: "email",
      name: "email",
      value: forgotPasswordFormValues.email,
    },
  ];

  // Helper function to handle input changes
  const handleChange =
    (field: keyof typeof forgotPasswordFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForgotPasswordFormValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
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
          onChange={handleChange(
            field.name as keyof typeof forgotPasswordFormValues,
          )}
          required
        />
      ))}
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <button
          type="submit"
          className="btn btn-primary w-full font-dm-sans text-lg text-white"
        >
          Reset Password
        </button>
        <div>
          <p className="text-center font-dm-sans text-[#6e7179]">
            Didn't get token?{" "}
            <span
              onClick={() => navigate("/register")}
              className="px-2 text-primary underline-offset-2 hover:underline"
            >
              Resend Token
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
