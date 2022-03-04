import React from "react";
import _ from "lodash/fp";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller, Control, MultipleFieldErrors } from "react-hook-form";
import { IFormInputs } from "../interface";
import { countries } from "../countries";

interface ICountry {
  code: string;
  label: string;
  phone: string;
}

export const CountrySelect = ({
  control,
  render,
  defaultCode,
}: {
  control: Control<IFormInputs, object>;
  render?:
    | ((data: {
        message: string;
        messages?: MultipleFieldErrors | undefined;
      }) => React.ReactNode)
    | undefined;
  defaultCode?: string;
}): JSX.Element => {
  const defaultValues = { country: { code: "", label: "", phone: "" }};
  if (defaultCode) {
    const defaultCountry = countries.find(
      (country) => country.code === defaultCode
    );
    if (defaultCountry?.label && defaultCountry?.phone)
      defaultValues.country = {
        code: defaultCode,
        label: defaultCountry?.label,
        phone: defaultCountry?.phone,
      };
  }

  return (
    <>
      <Controller
        render={({ field }) => (
          <Autocomplete
            defaultValue={defaultValues.country}
            options={countries}
            getOptionLabel={(option) => option.label}
            renderOption={(option) => (
              <span>
                {countryToFlag(option.code) + " "}
                {option.label}
              </span>
            )}
            getOptionSelected={(option: ICountry, value: ICountry) =>
              _.isEqual(
                option ?? defaultValues.country,
                value ?? defaultValues.country
              )
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose your country"
                variant="outlined"
              />
            )}
            onChange={(_, data) =>
              field.onChange(data ?? defaultValues.country)
            }
          />
        )}
        name="country"
        control={control}
      />
    </>
  );
};

function countryToFlag(isoCode: string) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}
