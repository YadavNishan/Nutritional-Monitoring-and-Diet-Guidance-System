import React, { useState } from "react";
import RegisterForm from "../../../components/forms/register/RegisterForm";
import { register } from "../../../api/auth.api";
import Loading from "../../../components/lodaing/Loading";
import { useNavigate } from "react-router";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [registerFromValues, setRegisterFormValues] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await register(
        registerFromValues.name,
        registerFromValues.email,
        registerFromValues.password,
      ); // Call the API
      console.log("Success:", response);

      // Handle success response
      setSuccessMessage("Registration successful!");
      navigate("/verify-email");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error:", err);
      setError(
        err?.response?.data?.message || "An error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form relative">
      <div className="form-header">
        <h1 className="title">Register</h1>
        <p className="subtitle">
          Welcome to the registration page. Please fill in the form below to
          create an account.
        </p>
      </div>
      <div className="form-body">
        <RegisterForm
          registerFormValues={registerFromValues}
          setRegisterFormValues={setRegisterFormValues}
          onSubmit={onSubmit}
        />
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Register;
