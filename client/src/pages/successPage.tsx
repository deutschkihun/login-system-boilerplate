import React from "react";
import { useHistory } from "react-router";
import { TitleComponent } from "../helper/helperComponent";
import { Form, SubmitButton, Warning } from "../helper/lib";

export const SuccessPage = () => {
  const history = useHistory();
  return (
    <Form>
        <TitleComponent title={"Success"} />
        <Warning>Congraulations. Your request is successfully saved</Warning>
        <SubmitButton type="submit" onClick={() => history.push("/")}>
          Done
        </SubmitButton>
    </Form>
  );
};
