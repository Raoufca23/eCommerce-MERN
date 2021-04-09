import { authConstants } from "./constants";
import http from "../../helpers";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });
    await http
      .post("/signin", user)
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: authConstants.LOGIN_SUCCESS, payload: user });
      })
      .catch((error) => {
        const err = error.response
          ? error.response.data.message
          : error.message;
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: err },
        });
      });
  };
};

export const isUserLoggedIn = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({ type: authConstants.LOGIN_SUCCESS, payload: user });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGOUT_REQUEST,
    });
    await http
      .post("/signout")
      .then((response) => {
        if (response.status === 200) {
          localStorage.clear();
          dispatch({
            type: authConstants.LOGOUT_SUCCESS,
          });
        }
      })
      .catch((error) => {
        const err = error.response
          ? error.response.data.message
          : error.message;
        dispatch({
          type: authConstants.LOGOUT_FAILURE,
          payload: { error: err },
        });
      });
  };
};
