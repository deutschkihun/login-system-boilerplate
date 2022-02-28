import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { loginFormInputs } from "../interface";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../_actions/user_actions";

export const LoginPage = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<loginFormInputs>({
    criteriaMode: "all",
  });

  const [body, setBody] = useState<loginFormInputs>();
  const history = useHistory();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<loginFormInputs> = (data: loginFormInputs) =>
    setBody(data);
  const strongRegex: RegExp = new RegExp(
    "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  useEffect(() => {
    async function login() {
      if (body !== undefined) {
        const response = await dispatch(loginUser(body));
        if (response.payload.login === "success") {
          history.push("/menu");
        } else {
          alert(response.payload.message);
        }
      }
    }
    login();
    return () => {
      setBody(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1 className="login">Login</h1>
          <section>
            <label>Email</label>
            <input
              placeholder="enter your email"
              {...register("email", {
                required: "This input is required.",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email format",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) => {
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}
            />
          </section>

          <section>
            <label>Password</label>
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
          <h3>
            Don't you have account yet ? then let's{" "}
            <Link to="/register">sign up</Link>
          </h3>
          <h3>
            Forgot your Email or Password ? then click{" "}
            <Link to="/forgot">here</Link>
          </h3>
        </div>
        <input type="submit" value="login" />
      </form>
    </>
  );
};
