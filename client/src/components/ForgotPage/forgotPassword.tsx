import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ThemeProvider, createTheme } from "@material-ui/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { findPassword } from "../../interface";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../_actions/user_actions";

export const ForgotPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<findPassword>({
    criteriaMode: "all",
  });

  const theme = createTheme({
    palette: {
      type: "dark",
    },
  });

  const [body, setbody] = useState<findPassword>();
  const [errorMessage, setErrorMessage] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [codeTyping, setCodeTyping] = useState(false);
  const [pin, setPin] = useState<number>(0);
  const [enteredCode, setEnteredCode] = useState(0);
  const [email, setEmail] = useState("");
  const onSubmit: SubmitHandler<findPassword> = (data: findPassword) =>
    setbody(data);

  useEffect(() => {
    async function findPassword() {
      if (body !== undefined) {
        const response = await dispatch(forgotPassword(body));
        if (response.payload.find) {
          setPin(response.payload.code as number);
          setEmail(response.payload.email);
          setCodeTyping(true);
        } else {
          setErrorMessage(response.payload.message as string);
        }
      }
    }
    findPassword();
    return () => {
      setbody(undefined);
      setErrorMessage("");
      setCodeTyping(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body]);

  const handleChange = (e: { target: { value: any } }) => {
    const enteredPin: number = e.target.value;
    setEnteredCode(enteredPin);
  };

  const onCheckPinHandler = () => {
    // eslint-disable-next-line eqeqeq
    if (pin == enteredCode) {
      history.push({
        pathname: "/reset/password",
        state: {
          email: email,
        },
      });
    } else {
      setVerificationMessage("wrong verification code");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Forgot Password</h1>
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

          <input type="submit" value="Find Password" />
          <button type="submit" onClick={() => history.push("/")}>
            Back to Sign in
          </button>
          {errorMessage.length > 0 && (
            <p style={{ textAlign: "center" }}>{errorMessage}</p>
          )}
          {codeTyping && (
            <>
              <h1>Verification</h1>
              <p>Verification code is sent. Please check your mailbox</p>
              <input
                type="number"
                placeholder="enter verification code"
                value={enteredCode}
                onChange={handleChange}
              />
              {verificationMessage && (
                <p style={{ textAlign: "center" }}>{verificationMessage}</p>
              )}
              <button type="submit" onClick={onCheckPinHandler}>
                Send
              </button>
            </>
          )}
        </div>
      </form>
    </ThemeProvider>
  );
};
