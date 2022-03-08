import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { IFormInputs, setting } from "../interface";
import { ThemeProvider, createTheme } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { changeUser, settingUser } from "../_actions/user_actions";
import { Form, Input, SubmitButton, SubmitInput } from "../helper/lib";
import { ErrorMessageComponent, InputComponent, LabelComponent, TitleComponent } from "../helper/helperComponent";
import { numberRex, rex, stringRex } from "../helper/utils";

export const SettingPage = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
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
  const [found, setFound] = useState<setting>();
  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) =>
    setBody(data);

  useEffect(() => {
    async function setting() {
      const response = await dispatch(settingUser());
      if (response.payload.found) {
        setFound(response.payload);
      }
    }
    setting();
  }, [dispatch]);

  useEffect(() => {
    async function register() {
      if (body !== undefined) {
        const response = await dispatch(changeUser({...body, "email":found?.user.email as string}));
        if (response.payload.change) {
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
      {found && (
        <Form onSubmit={handleSubmit(onSubmit)}>
        <TitleComponent title={"Setting"} />
        <LabelComponent label={"First Name"} />
        <InputComponent
          placeholder={"enter your first name"}
          type="text"
          defaultValue={found.user.firstName}
          register={register}
          registerValue={"firstName"}
          pattern={stringRex}
          message={"This input is string only."}
        />
        <ErrorMessageComponent name={"firstName"} errors={errors} />

        <LabelComponent label={"Last Name"} />
        <InputComponent
          placeholder={"enter your last name"}
          type="text"
          defaultValue={found.user.lastName}
          register={register}
          registerValue={"lastName"}
          pattern={stringRex}
          message={"This input is string only."}
        />
        <ErrorMessageComponent name={"lastName"} errors={errors} />

        <LabelComponent label={"Age"} />
        <InputComponent
          placeholder={"enter your age"}
          type="text"
          defaultValue={found.user.age}
          register={register}
          registerValue={"age"}
          pattern={numberRex}
          message={"This input is number only."}
        />
        <ErrorMessageComponent name={"age"} errors={errors} /> 
     
        <LabelComponent label={"Phonenumber"} />
        <InputComponent
          placeholder={"enter your phone number"}
          type="text"
          defaultValue={found.user.phone}
          register={register}
          registerValue={"phone"}
          pattern={numberRex}
          message={"This input is number only."}
        />
        <ErrorMessageComponent name={"phone"} errors={errors} /> 
 
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

       <SubmitInput value="change" />
       <SubmitButton onClick={() => history.push("/menu")}>
            back
       </SubmitButton>
        </Form>
      )}
    </ThemeProvider>
  );
};
