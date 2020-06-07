import * as actionTypes from "./types";

export const returnErrors = (msg, status, id = null) => {
  return {
    type: actionTypes.GET_ERRORS,
    payload: { msg, status, id },
  };
};

export const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERRORS,
  };
};
