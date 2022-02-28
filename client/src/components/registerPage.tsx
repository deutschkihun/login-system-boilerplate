import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { CountrySelect } from "./countrySelect";
import { IFormInputs } from "../interface";
import { ThemeProvider, createTheme } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { registerUser } from "../_actions/user_actions";

export const RegisterPage = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = useForm<IFormInputs>({
    criteriaMode: "all",
  });

  const theme = createTheme({
    palette: {
      type: "dark",
    },
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const password: React.MutableRefObject<string | undefined> = useRef();
  password.current = watch("password");
  const [body, setBody] = useState<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) =>
    setBody(data);
  const strongRegex: RegExp = new RegExp(
    "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  useEffect(() => {
    async function register() {
      if (body !== undefined) {
        const response = await dispatch(registerUser(body));
        if (response.payload.registration === "success") {
          history.push("/success");
        } else {
          alert(response.payload.message);
        }
      }
    }
    register();
    return () => {
      setBody(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body]);

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Registration</h1>
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
              placeholder="enter your last name"
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

          <section>
            <label>Nationality</label>
            <CountrySelect
              control={control}
              {...register("country", {
                required: "This input is required.",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="country"
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

          <section>
            <label>Confirm password</label>
            <input
              type="password"
              placeholder="check your password again"
              {...register("password_confirm", {
                required: "This input is required.",
                validate: (value: string) => value === password.current,
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password_confirm"
              render={({ messages }) => {
                return messages
                  ? Object.entries(messages).map(([type, message]) =>
                      type === "validate" ? (
                        <p key="validate">Passwords don't match each other</p>
                      ) : (
                        <p key={type}>{message}</p>
                      )
                    )
                  : null;
              }}
            />
          </section>
        </div>
        <input type="submit" value="register" />
        <button type="submit" onClick={() => history.push("/")}>
          back
        </button>
      </form>
    </ThemeProvider>
  );
};
