import { IFormInputs } from "../interface";

export const Reducer = (
  state = {},
  action: { type: string; payload: Promise<void | IFormInputs> }
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default Reducer;