import { ActionTypes } from "../contants/ActionTypes";

const initialState = {
  email: "", // Initial state for email
};

export const EmailReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_EMAIL:
      return {
        ...state,
        email: payload,
      };

    default:
      return state;
  }
};
