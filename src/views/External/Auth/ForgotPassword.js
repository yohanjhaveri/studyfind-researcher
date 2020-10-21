import React from "react";

import { AuthForm } from "components";
import { sendPasswordResetEmail } from "database";

function Signup({ setTab, setMessage }) {
  const handleSubmit = ({ email }) => sendPasswordResetEmail(email);

  const handleSuccess = () => {
    setMessage({
      type: "success",
      title: "Email Sent!",
      text: "Check your email for a password reset link",
    });
  };

  return (
    <AuthForm
      heading="Forgot Password"
      initial={{ email: "" }}
      button="Send password reset email"
      setTab={setTab}
      redirect={{ prompt: "Return to login", tab: "login" }}
      onSubmit={handleSubmit}
      onSuccess={handleSuccess}
      onFailure={() => console.log("failure")}
    ></AuthForm>
  );
}

export default Signup;
