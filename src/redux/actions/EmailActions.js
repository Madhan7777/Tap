import { ActionTypes } from "../contants/ActionTypes";

export const setEmail = (email) => {
  return {
    type: ActionTypes.SET_EMAIL,
    payload: email,
  };
};