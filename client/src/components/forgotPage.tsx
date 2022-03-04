import React from "react";
import { useHistory } from "react-router";

export const ForgotPage = (): JSX.Element => {
  const history = useHistory();
  return (
    <form>
      <div>
        <h1>Menu</h1>
        <button type="submit" onClick={() => history.push("/forgot/email")}>
          Forgot Email
        </button>
        <button type="submit" onClick={() => history.push("/forgot/password")}>
          Forgot Password
        </button>
        <button type="submit" onClick={() => history.push("/")}>
          Back to Sign in
        </button>
      </div>
    </form>
  );
};
