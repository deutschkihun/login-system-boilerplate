import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ThemeProvider, createTheme } from "@material-ui/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { findEmail } from "../interface";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch } from "react-redux";
import { forgotEmail } from "../_actions/user_actions";

export const ForgotEmail = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<findEmail>({
    criteriaMode: "all",
  });

  const theme = createTheme({
    palette: {
      type: "dark",
    },
  });

  const [body, setbody] = useState<findEmail>();
  const [foundEmail, setfoundEmail] = useState<string>("");
  const [error, setError] = useState("");
  const onSubmit: SubmitHandler<findEmail> = (data: findEmail) => setbody(data);

  useEffect(() => {
    async function findEmail() {
      if (body !== undefined) {
        const response = await dispatch(forgotEmail(body));
        if (response.payload.find) {
          setfoundEmail(response.payload.email as string);
        } else {
          setError(response.payload.message as string);
        }
      }
    }
    findEmail();
    return () => {
      setbody(undefined);
      setfoundEmail("");
      setError("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body]);

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Forgot Email</h1>
          <section>
            <label>First name</label>
            <input
              placeholder="enter your first name"
              {...register("firstName", {
                required: "This input is required.",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "This input is string only.",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="firstName"
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
            <label>Last name</label>
            <input
              placeholder="enter your first name"
              {...register("lastName", {
                required: "This input is required.",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "This input is string only.",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="lastName"
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
            <label>Age</label>
            <input
              placeholder="enter your age"
              {...register("age", {
                required: "This input is required.",
                pattern: {
                  value: /^\d+$/,
                  message: "This input is number only.",
                },
                maxLength: {
                  value: 10,
                  message: "This input exceed maxLength (10).",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="age"
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
            <label>Phonenumber</label>
            <input
              placeholder="enter your phone number"
              {...register("phone", {
                required: "This input is required.",
                pattern: {
                  value: /^\d+$/,
                  message: "This input is number only.",
                },
                maxLength: {
                  value: 20,
                  message: "This input exceed maxLength (20).",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="phone"
              render={({ messages }) => {
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}
            />
          </section>
          <input type="submit" value="Find Email" />
          <button type="submit" onClick={() => history.push("/")}>
            Back to Sign in
          </button>
          {foundEmail.length > 0 && (
            <div className="success">
              <p>{foundEmail}</p>
            </div>
          )}
          {error.length > 0 && <p style={{ textAlign: "center" }}>{error}</p>}
        </div>
      </form>
    </ThemeProvider>
  );
};
