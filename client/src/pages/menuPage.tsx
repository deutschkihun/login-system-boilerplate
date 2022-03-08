import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { TitleComponent } from "../helper/helperComponent";
import { Form, SubmitButton, Warning } from "../helper/lib";
import { settingUser } from "../_actions/user_actions";

export const MenuPage = (): JSX.Element => {
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
    await axios.get("/api/v1/auth/logout")
  };

  return (
    <Form>
        <TitleComponent title={"Menu"} />
        <SubmitButton  onClick={() => history.push("/setting")}>
          Setting
        </SubmitButton>
        <SubmitButton onClick={onClickLogouthandler}>
          Logout
        </SubmitButton>
        {loginedUser.length > 0 && (
            <Warning>You are logged in with {loginedUser}</Warning>
        )}
    </Form>
  );
};
