import React, { useState } from "react";
import ForgotPasswordForm from "../../../components/forms/forgotPassword/ForgotPasswordForm";

const ForgotPassword: React.FC = () => {
  const [forgotPasswordFormValues, setForgotPasswordFormValues] = useState({
    email: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(forgotPasswordFormValues);
  };

  return (
    <div className="form">
      <div className="form-header">
        <h2 className="title">Verify Email</h2>
      </div>
      <div className="form-body">
        <ForgotPasswordForm
          forgotPasswordFormValues={forgotPasswordFormValues}
          setForgotPasswordFormValues={setForgotPasswordFormValues}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
