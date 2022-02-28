import React from "react";
import { useHistory } from "react-router";

export const SuccessChangePage = () => {
  const history = useHistory();
  return (
    <form>
      <div className="success">
        <h1>Success</h1>
        <p>
          Congraulations !! Changed information is successfully saved.
        </p>
        <button type="submit" onClick={() => history.push("/menu")}>
          Back to menu
        </button>
      </div>
    </form>
  );
};
