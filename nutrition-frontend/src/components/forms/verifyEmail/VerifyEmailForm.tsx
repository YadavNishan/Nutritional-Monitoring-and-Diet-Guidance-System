import React, { useState } from "react";
import InputField from "../InputField";
import { reSendToken } from "../../../api/auth.api";
import Loading from "../../lodaing/Loading";

interface PVerifyEmailForm {
  verifyEmailFormValues: {
    email: string;
    emailVerificationToken: string;
  };
  setVerifyEmailFormValues: React.Dispatch<
    React.SetStateAction<{
      email: string;
      emailVerificationToken: string;
    }>
  >;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const VerifyEmailForm: React.FC<PVerifyEmailForm> = ({
  onSubmit,
  verifyEmailFormValues,
  setVerifyEmailFormValues,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Input fields configuration
  const inputFields = [
    {
      label: "Email:",
      type: "text",
      id: "email",
      name: "email",
      value: verifyEmailFormValues.email,
    },
    {
      label: "Token:",
      type: "text",
      id: "emailVerificationToken",
      name: "emailVerificationToken",
      value: verifyEmailFormValues.emailVerificationToken,
    },
  ];

  // Handle input changes dynamically
  const handleChange =
    (field: keyof typeof verifyEmailFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVerifyEmailFormValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  // Resend verification token logic
  const resendVerificationToken = async (email: string | null) => {
    if (!email) {
      setErrorMessage("Email is required to resend token.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await reSendToken(email);
      setSuccessMessage("Verification token resent successfully!");
      console.log("Success:", response);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Failed to resend verification token.",
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form-container">
      {/* Input fields */}
      {inputFields.map((field) => (
        <InputField
          key={field.id}
          label={field.label}
          type={field.type}
          id={field.id}
          name={field.name}
          value={field.value}
          onChange={handleChange(
            field.name as keyof typeof verifyEmailFormValues,
          )}
          required
        />
      ))}

      {/* Error or success messages */}
      {errorMessage && (
        <p className="text-center font-dm-sans text-red-600">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-center font-dm-sans text-green-600">
          {successMessage}
        </p>
      )}

      {/* Submit and Resend Button */}
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <button
          type="submit"
          className="btn btn-primary w-full font-dm-sans text-lg text-white"
        >
          Verify Email
        </button>
        <div>
          <p className="text-center font-dm-sans text-[#6e7179]">
            Didn't get token?{" "}
            <span
              onClick={() =>
                resendVerificationToken(
                  localStorage.getItem("email") || verifyEmailFormValues.email,
                )
              }
              className={`cursor-pointer px-2 text-primary underline-offset-2 ${
                loading ? "cursor-not-allowed opacity-50" : "hover:underline"
              }`}
            >
              Resend Token
            </span>
          </p>
        </div>
      </div>
      {loading && <Loading />}
    </form>
  );
};

export default VerifyEmailForm;
