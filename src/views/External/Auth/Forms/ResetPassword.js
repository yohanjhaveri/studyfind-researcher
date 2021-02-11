import React from "react";

import { useAuthForm } from "hooks";
import { resetPassword } from "database/auth";

import { Form, Heading, Password, Button, TabLink } from "views/External/Auth/Blocks";
import { Message } from "components";

function ResetPassword({ setTab }) {
  const url = new URL(window.location.href);
  const actionCode = url.searchParams.get("oobCode");

  const { inputs, errors, success, loading, handleChange, handleSubmit } = useAuthForm({
    initial: { password: "" },
    onSubmit: resetPassword,
  });

  if (success) {
    return (
      <Message
        type="success"
        title="Password Reset!"
        description="You can now use your new password to log in"
        padding="40px 30px"
      >
        <TabLink onClick={() => setTab("login")}> Back to login </TabLink>
      </Message>
    );
  }

  return (
    <Form onSubmit={() => handleSubmit(actionCode, inputs.password)}>
      <Heading>Reset Password</Heading>
      <Password value={inputs.password} error={errors.password} onChange={handleChange} />
      <Button loading={loading}>Confirm Reset Password</Button>
      <TabLink onClick={() => setTab("login")}>Back to login</TabLink>
    </Form>
  );
}

export default ResetPassword;
