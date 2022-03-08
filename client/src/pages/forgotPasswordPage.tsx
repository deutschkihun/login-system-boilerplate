import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { findPassword } from "../interface";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../_actions/user_actions";
import { ErrorMessageComponent, InputComponent, LabelComponent, TitleComponent } from "../helper/helperComponent";
import { Form, Input, SubmitButton, SubmitInput, Warning } from "../helper/lib";
import { emailRex, stringRex } from "../helper/utils";

export const ForgotPassword = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<findPassword>({
    criteriaMode: "all",
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
      <Form onSubmit={handleSubmit(onSubmit)}>
          <TitleComponent title={"Forgot Password"} />
            <LabelComponent label={"First name"}></LabelComponent>
            <InputComponent
              placeholder="enter your first name"
              register={register}
            registerValue={"firstName"}
            pattern={stringRex}
            message={"This input is number only."}
          />
          <ErrorMessageComponent name={"firstName"} errors={errors} />
        
          <LabelComponent label={"Last name"} />
          <InputComponent
            placeholder={"enter your last name"}
            register={register}
            registerValue={"lastName"}
            pattern={stringRex}
            message={"This input is string only."}
          />
          <ErrorMessageComponent name={"lastName"} errors={errors} />
 
          <LabelComponent label={"Email"} />
          <InputComponent
            placeholder={"enter your email"}
            register={register}
            registerValue={"email"}
            pattern={emailRex}
            message={"Invalid email format."}
          />
          <ErrorMessageComponent name={"email"} errors={errors} />

          <SubmitInput value="Find Password" />
          <SubmitButton type="submit" onClick={() => history.push("/")}>
            Back to Sign in
          </SubmitButton>
          {errorMessage.length > 0 && (
            <Warning style={{ textAlign: "center" }}>{errorMessage}</Warning>
          )}
          {codeTyping && (
            <>
              <TitleComponent title={"Verification"} />
              <Warning>Verification code is sent. Please check your mailbox</Warning>
              <Input
                type="number"
                placeholder="enter verification code"
                value={enteredCode}
                onChange={handleChange}
              />
              {verificationMessage && (
                <Warning style={{ textAlign: "center" }}>{verificationMessage}</Warning>
              )}
              <SubmitButton onClick={onCheckPinHandler}>
                Send
              </SubmitButton>
            </>
          )}
      </Form>
  );
};
