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
        console.log(error);
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

export const addCategory = (data) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ADD_CATEGORY_REQUEST });
    await http
      .post("/category/create", data)
      .then((response) => {
        dispatch({
          type: categoryConstants.ADD_CATEGORY_SUCCESS,
          payload: { category: response.data.category },
        });
      })
      .catch((error) => {
        console.log(error);
        // let err = error.response ? error.response.data.message : error.message;
        /* dispatch({
          type: categoryConstants.ADD_CATEGORY_FAILURE,
          payload: { error},
        }); */
      });
  };
};
