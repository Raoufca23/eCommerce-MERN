import http from "../../helpers";
import { categoryConstants } from "./constants";

export const getCategories = () => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstants.GET_CATEGORIES_REQUEST,
    });
    await http
      .get("/categories")
      .then((response) => {
        const { categories } = response.data;
        dispatch({
          type: categoryConstants.GET_CATEGORIES_SUCCESS,
          payload: categories,
        });
      })
      .catch((error) => {
        const err = error.response
          ? error.response.data.message
          : error.message;
        dispatch({
          type: categoryConstants.GET_CATEGORIES_FAILURE,
          payload: { error: err },
        });
      });
  };
};
