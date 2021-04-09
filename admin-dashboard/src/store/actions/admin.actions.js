import { adminConstants } from "./constants";
import http from "../../helpers";

export const signUpAdmin = (admin) => {
  return async (dispatch) => {
    dispatch({ type: adminConstants.REGISTER_ADMIN_REQUEST });
    await http
      .post("/signup", admin)
      .then((response) => {
        const { message } = response.data;
        dispatch({
          type: adminConstants.REGISTER_ADMIN_SUCCESS,
          payload: message,
        });
        console.log(response)
      })
      .catch((error) => {
        const err = error.response
          ? error.response.data.message
          : error.message;
          console.log(err)
        dispatch({
          type: adminConstants.REGISTER_ADMIN_FAILURE,
          payload: { error: err },
        });
      });
  };
};
