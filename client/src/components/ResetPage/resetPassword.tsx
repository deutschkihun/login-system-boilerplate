import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { ThemeProvider, createTheme } from "@material-ui/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { resetPassword } from "../../interface";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { resetPasswordUser } from "../../_actions/user_actions";

interface locationCode {
  pathname: string;
  email: string;
}

export const ResetPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation<locationCode>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<resetPassword>({
    criteriaMode: "all",
  });

  const theme = createTheme({
    palette: {
      type: "dark",
    },
  });

  const password: React.MutableRefObject<string | undefined> = useRef();
  password.current = watch("password");
  const [body, setbody] = useState<resetPassword>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [email, setEmail] = useState("");
  const onSubmit: SubmitHandler<resetPassword> = (data: resetPassword) => {
    data.email = location.state.email;
    setbody(data);
  };

  const strongRegex: RegExp = new RegExp(
    "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  useEffect(() => {
    setEmail(location?.state.email);
  }, [location]);

  useEffect(() => {
    async function resetPassword() {
      if (body !== undefined) {
        const response = await dispatch(resetPasswordUser(body));
        if (response.payload.reset) {
          history.push("/success");
        }
      }
    }
    resetPassword();
    return () => {
      setbody(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body]);

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Reset Password</h1>
          <section>
            <label>New Password</label>
            <input
              type="password"
              placeholder="enter your password"
              {...register("password", {
                required: "This input is required.",
                pattern: {
                  value: strongRegex,
                  message:
                    "Password should contain at least 1 uppercase, sepcial character and be eight chracters or longer",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ messages }) => {
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}
            />
          </section>
          <input type="submit" value="Reset Password" />
          <button type="submit" onClick={() => history.push("/")}>
            Back to Sign in
          </button>
        </div>
      </form>
    </ThemeProvider>
  );
};
