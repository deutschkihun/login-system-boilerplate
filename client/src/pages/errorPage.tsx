import React from "react";
import { useHistory } from "react-router";
import { TitleComponent } from "../helper/helperComponent";
import { Form, SubmitButton, Warning } from "../helper/lib";

export const ErrorPage = (): JSX.Element => {
  const history = useHistory();
  return (
    <Form>
      <TitleComponent title={"Not found 404"} />
      <Warning>This page does not exist</Warning>
      <SubmitButton onClick={() => history.push("/")}>
        back to login page
      </SubmitButton>
    </Form>
  );
};
