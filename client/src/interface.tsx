import { NestedValue } from "react-hook-form";
export interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: number;
  country?: NestedValue<{ code: string; label: string; phone: string }>;
  password: string;
  password_confirm: string;
  message?: string;
  status?: string;
  registration?: string;
  change?: boolean;
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
  find?: Boolean;
  email?: string;
  message?: string;
}

export interface findPassword {
  firstName: string;
  lastName: string;
  email: string;
  find?: Boolean;
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

export interface setting {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    phone: number;
    countryCode: string;
  };
  found: boolean;
}
