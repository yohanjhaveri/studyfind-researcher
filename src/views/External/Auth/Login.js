import React from "react";
import styled from "styled-components";

import AuthForm from "./AuthForm";
import { signin } from "database";

function Login({ setTab, setMessage }) {
  const handleSubmit = ({ email, password }) => signin(email, password);

  return (
    <AuthForm
      heading="Welcome Back"
      initial={{ email: "", password: "" }}
      button="Login"
      social
      setTab={setTab}
      redirect={{ prompt: "Forgot Password?", tab: "forgot password" }}
      onSubmit={handleSubmit}
      onSuccess={() => console.log("success")}
      onFailure={() => console.log("failure")}
    ></AuthForm>
  );
}

export default Login;
