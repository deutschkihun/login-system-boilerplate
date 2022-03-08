import { FieldError, UseFormRegister } from "react-hook-form";

export interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirm: string;
  age:number;
  phone:number;
}

export interface loginFormInputs {
  email: string;
  password: string;
  isAuth?: boolean;
  message?: string;
  status?: string;
  login?: string;
}

export interface findEmail {
  firstName: string;
  lastName: string;
  phone: number;
  age: number;
  find?: boolean;
  email?: string;
  message?: string;
}

export interface findPassword {
  firstName: string;
  lastName: string;
  email: string;
  find?: boolean;
  message?: string;
  code?: number;
}

export interface resetPassword {
  code?: number;
  password?: string;
  email: string;
  reset: boolean;
  message: string;
}

export interface ErrorProps {
  name: string;
  errors: { [x: string]: FieldError } | undefined;
}

export interface LabelProps {
  label: string;
}

export interface TitleProps {
  title: string;
}

export interface InputProps {
  placeholder: string;
  register: UseFormRegister<IFormInputs>;
  registerValue:
    | "email"
    | "password_confirm"
    | "password"
    | "firstName"
    | "lastName"
    | "age"
    | "phone";
  pattern?: RegExp;
  message?: string;
  type?: string;
  defaultValue?: string | number;
}
