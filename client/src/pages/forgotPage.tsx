import React from "react";
import { useHistory } from "react-router";
import { TitleComponent } from "../helper/helperComponent";
import { Form, SubmitButton } from "../helper/lib";

export const ForgotPage = (): JSX.Element => {
  const history = useHistory();
  return (
    <Form>
        <TitleComponent title={"Menu"}/>
        <SubmitButton onClick={() => history.push("/forgot/email")}>
          Forgot Email
        </SubmitButton>
        <SubmitButton onClick={() => history.push("/forgot/password")}>
          Forgot Password
        </SubmitButton>
        <SubmitButton onClick={() => history.push("/")}>
          Back to Sign in
        </SubmitButton>
    </Form>
  );
};
