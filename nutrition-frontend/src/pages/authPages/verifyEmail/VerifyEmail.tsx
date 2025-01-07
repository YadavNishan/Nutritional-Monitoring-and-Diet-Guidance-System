import React, { useState } from "react";
import VerifyEmailForm from "../../../components/forms/verifyEmail/VerifyEmailForm";
import { verifyEmail } from "../../../api/auth.api";
import Loading from "../../../components/lodaing/Loading";
import { useNavigate } from "react-router";

const VerifyEmail: React.FC = () => {
  const [verifyEmailFormValues, setVerifyEmailFormValues] = useState({
    email: localStorage.getItem("email") || "",
    emailVerificationToken: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await verifyEmail(
        verifyEmailFormValues.email,
        verifyEmailFormValues.emailVerificationToken,
      ); // Call the API
      console.log("Success:", response);

      // Handle success response
      setSuccessMessage("Email verification successful!");
      navigate("/getting-started");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error:", err);
      setError(
        err.response?.data?.message || "Verification failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <div className="form-header">
        <h2 className="title">Verify Email</h2>
      </div>
      <div className="form-body">
        <VerifyEmailForm
          verifyEmailFormValues={verifyEmailFormValues}
          setVerifyEmailFormValues={setVerifyEmailFormValues}
          onSubmit={onSubmit}
        />
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default VerifyEmail;
