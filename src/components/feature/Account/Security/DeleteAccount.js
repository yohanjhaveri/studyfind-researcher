import { useAuth } from "hooks";

import { Grid, Button } from "@chakra-ui/react";
import { Form, EmailInput, PasswordInput } from "components";

import AccountHeader from "../AccountHeader";

function DeleteAccount({ handleDeleteAccount }) {
  const { inputs, errors, loading, handleChange, handleSubmit } = useAuth(
    { email: "", password: "" },
    handleDeleteAccount
  );

  return (
    <>
      <AccountHeader
        title="Delete Account"
        description="Deleting your account is a permenant action which will delete all your
        user information and research studies"
      />
      <Form onSubmit={handleSubmit}>
        <Grid gap="15px">
          <EmailInput
            name="email"
            label="Email"
            value={inputs.email}
            error={errors.email}
            onChange={handleChange}
          />
          <PasswordInput
            name="password"
            label="Password"
            value={inputs.password}
            error={errors.password}
            onChange={handleChange}
          />
          <Button type="submit" colorScheme="red" isLoading={loading}>
            Delete Account
          </Button>
        </Grid>
      </Form>
    </>
  );
}

export default DeleteAccount;
