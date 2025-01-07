import React from "react";
import { useNavigate } from "react-router";
import InputField from "../InputField";

interface PLoginForm {
  loginFormValues: {
    email: string;
    password: string;
  };
  setLoginFromValues: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<PLoginForm> = ({
  onSubmit,
  loginFormValues,
  setLoginFromValues,
}) => {
  const navigate = useNavigate();

  // Array of input field configurations
  const inputFields = [
    {
      label: "Email:",
      type: "text",
      id: "email",
      name: "email",
      value: loginFormValues.email,
    },
    {
      label: "Password:",
      type: "password",
      id: "password",
      name: "password",
      value: loginFormValues.password,
    },
  ];

  // Helper function to handle input changes
  const handleChange =
    (field: keyof typeof loginFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginFromValues((prev) => ({ ...prev, [field]: e.target.value }));
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
          onChange={handleChange(field.name as keyof typeof loginFormValues)}
          required
        />
      ))}
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <button
          type="submit"
          className="btn btn-primary w-full font-dm-sans text-lg text-white"
        >
          Login
        </button>
        <div>
          <p className="text-center font-dm-sans text-[#6e7179]">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="px-2 text-primary underline-offset-2 hover:underline"
            >
              Get Started
            </span>
          </p>
          <p className="text-center font-dm-sans text-[#6e7179]">
            <span
              onClick={() => navigate("/register")}
              className="px-2 text-primary underline-offset-2 hover:underline"
            >
              Forgot Password?{" "}
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
