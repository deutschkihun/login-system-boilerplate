import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginFormInputs } from "../interface";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../_actions/user_actions";
import { Form, HighlightLink, SubmitInput, SubTitle } from "../helper/lib";
import { ErrorMessageComponent, InputComponent, LabelComponent, TitleComponent } from "../helper/helperComponent";
import { emailRex, rex } from "../helper/utils";

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
      <Form onSubmit={handleSubmit(onSubmit)}>
          <TitleComponent title={"Login"} />
          <LabelComponent label={"Email"} />
          <InputComponent
            placeholder={"enter your email"}
            register={register}
            registerValue={"email"}
            pattern={emailRex}
            message={"Invalid email format."}
          />
          <ErrorMessageComponent name={"email"} errors={errors} />
          <LabelComponent label={"Password"} />
          <InputComponent
            type={"password"}
            placeholder={"enter your password"}
            register={register}
            registerValue={"password"}
            pattern={rex}
            message={
              "At least 1 uppercase, special character and longer than 8 chars"
            }
          />
          <ErrorMessageComponent name={"password"} errors={errors} />

        <SubTitle>
          No account yet ? then{" "}
          <HighlightLink to="/register">sign up</HighlightLink> now.
        </SubTitle>
        <SubTitle>
          Forgot your Email or PW ? then click{" "}
          <HighlightLink to="/forgot">here.</HighlightLink>
        </SubTitle>
        <SubmitInput type="submit" value="login" />
      </Form>
  );
};
