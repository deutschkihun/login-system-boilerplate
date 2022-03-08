import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { CountrySelect } from "../components/countrySelect";
import { IFormInputs } from "../interface";
import { useDispatch } from "react-redux";
import { registerUser } from "../_actions/user_actions";
import { ErrorMessageComponent, InputComponent, LabelComponent, TitleComponent } from "../helper/helperComponent";
import { Form, Input, SubmitButton, SubmitInput } from "../helper/lib";
import { emailRex, numberRex, rex, stringRex } from "../helper/utils";

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

  const history = useHistory();
  const dispatch = useDispatch();
  const password: React.MutableRefObject<string | undefined> = useRef();
  password.current = watch("password");
  const [body, setBody] = useState<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) =>
    setBody(data);

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
      <Form onSubmit={handleSubmit(onSubmit)}>
      <TitleComponent title={"Registration"} />
      <LabelComponent label={"First Name"} />
      <InputComponent
        placeholder={"enter your first name"}
        register={register}
        registerValue={"firstName"}
        pattern={stringRex}
        message={"This input is string only."}
      />
      <ErrorMessageComponent name={"firstName"} errors={errors} />

      <LabelComponent label={"Last Name"} />
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
      <LabelComponent label={"Nationality"} />
      <CountrySelect
          control={control}
          {...register("country", {
            required: "This input is required.",
          })}
      />
      <ErrorMessageComponent name={"country"} errors={errors} /> 

      <LabelComponent label={"Email"} />
      <InputComponent
        placeholder={"enter your email"}
        register={register}
        registerValue={"email"}
        pattern={emailRex}
        message={"Invalid email format."}
      />
      

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
      <LabelComponent label={"Confirm Password"} />
      <Input
        type="password"
        placeholder="check your password again"
        {...register("password_confirm", {
          required: "This input is required.",
          validate: (value: string) => value === password.current,
        })}
      />
      <ErrorMessageComponent name={"password_confirm"} errors={errors} />

      <SubmitInput value="register" />
      <SubmitButton onClick={() => history.push("/")}>back</SubmitButton>
      </Form>
  );
};
