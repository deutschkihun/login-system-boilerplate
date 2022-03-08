import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { resetPassword } from "../interface";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { resetPasswordUser } from "../_actions/user_actions";
import { rex } from "../helper/utils";
import { ErrorMessageComponent, InputComponent, LabelComponent, TitleComponent } from "../helper/helperComponent";
import { Form, SubmitButton, SubmitInput } from "../helper/lib";

interface locationCode {
  pathname: string;
  email: string;
}

export const ResetPassword = (): JSX.Element => {
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

  const password: React.MutableRefObject<string | undefined> = useRef();
  password.current = watch("password");
  const [body, setbody] = useState<resetPassword>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [email, setEmail] = useState("");
  const onSubmit: SubmitHandler<resetPassword> = (data: resetPassword) => {
    data.email = location.state.email;
    setbody(data);
  };

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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TitleComponent title={"Reset Password"} />
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
    
        <SubmitInput value="Reset Password" />
        <SubmitButton onClick={() => history.push("/")}>
          Back to Sign in
        </SubmitButton>
      </Form>
  );
};
