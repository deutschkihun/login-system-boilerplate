import React from "react";
import { useHistory } from "react-router";

export const ErrorPage = (): JSX.Element => {
  const history = useHistory();
  return (
    <form className="error">
      <h1>Not found 404</h1>
      <p>This page does not exist</p>
      <button type="submit" onClick={() => history.push("/")}>
        back to login page
      </button>
    </form>
  );
};
