import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { findEmail } from "../interface";
import { useDispatch } from "react-redux";
import { forgotEmail } from "../_actions/user_actions";
import { ErrorMessageComponent, InputComponent, LabelComponent, TitleComponent } from "../helper/helperComponent";
import { Form, SubmitButton, SubmitInput, Warning } from "../helper/lib";
import { numberRex, stringRex } from "../helper/utils";

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
      <Form onSubmit={handleSubmit(onSubmit)}>
          <TitleComponent title={"Forgot Email"} />
            <LabelComponent label={"First name"} />
            <InputComponent
              placeholder={"enter your first name"}
              register={register}
              registerValue={"firstName"}
              pattern={stringRex}
              message={"This input is string only."}
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
 
        
          <LabelComponent label={"Age"} />
          <InputComponent
            placeholder={"enter your age"}
            register={register}
            registerValue={"age"}
            pattern={numberRex}
            message={"This input is number only."}
          />
          <ErrorMessageComponent name={"age"} errors={errors} /> 
           
          <LabelComponent label={"Phonenumber"} />
          <InputComponent
            placeholder={"enter your phone number"}
            register={register}
            registerValue={"phone"}
            pattern={numberRex}
            message={"This input is number only."}
          />
          <ErrorMessageComponent name={"phone"} errors={errors} /> 
          <SubmitInput value="Find Email" />
          <SubmitButton type="submit" onClick={() => history.push("/")}>
            Back to Sign in
          </SubmitButton>
          {foundEmail.length > 0 && (
              <Warning>{foundEmail}</Warning>
          )}
          {error.length > 0 && <Warning style={{ textAlign: "center" }}>{error}</Warning>}
      </Form>
  );
};
