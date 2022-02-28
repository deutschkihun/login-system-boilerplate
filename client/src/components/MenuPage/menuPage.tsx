import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { settingUser } from "../../_actions/user_actions";

export const MenuPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loginedUser, setLoginedUser] = useState("");
  // reuse settingUser function
  useEffect(() => {
    async function currentUser() {
      const response = await dispatch(settingUser());
      if (response.payload.found) {
        setLoginedUser(response.payload.user.email);
      }
    }

    currentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickLogouthandler = async () => {
    await axios.get("/api/v1/auth/logout").then(() => {
      history.push('/')
    });
  };

  return (
    <form>
      <div>
        <h1>Menu</h1>
        <button type="submit" onClick={() => history.push("/setting")}>
          Setting
        </button>
        <button type="submit" onClick={onClickLogouthandler}>
          Logout
        </button>
        {loginedUser.length > 0 && (
          <div className="success">
            <p>You are logged in with {loginedUser}</p>
          </div>
        )}
      </div>
    </form>
  );
};
