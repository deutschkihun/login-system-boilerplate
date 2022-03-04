import React from "react";
import { useHistory } from "react-router";

export const SuccessPage = () => {
  const history = useHistory();
  return (
    <form>
      <div className="success">
        <h1>Success</h1>
        <p>Congraulations. Your request is successfully saved</p>
        <button type="submit" onClick={() => history.push("/")}>
          Back to sign in
        </button>
      </div>
    </form>
  );
};
