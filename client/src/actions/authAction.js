import axios from "axios";
import { returnErrors } from "./errorActions";
import * as actionTypes from "./types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: actionTypes.USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({ type: actionTypes.USER_LOADED, payload: res.data });
    })
    .catch((err) => {
      console.log(err.response.data, err.response.status);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: actionTypes.AUTH_ERROR });
    });
};

export const register = ({ name, email, password }) => (dispatch) => {
  const body = { name, email, password };
  axios
    .post("/api/users", body)
    .then((res) => {
      dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({ type: actionTypes.REGISTER_FAIL });
    });
};

export const login = ({ email, password }) => (dispatch) => {
  const body = { email, password };
  console.log(body);
  axios
    .post("/api/auth", body)
    .then((res) => {
      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({ type: actionTypes.LOGIN_FAIL });
    });
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-type": "aplication/json",
    },
  };
  if (token) config.headers["x-auth-token"] = token;

  return config;
};
