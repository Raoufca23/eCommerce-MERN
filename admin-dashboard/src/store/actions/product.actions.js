import http from "../../helpers";
import { productConstants } from "./constants";

export const getProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: productConstants.GET_PRODUCTS_REQUEST,
    });
    await http
      .get("/products")
      .then((response) => {
        dispatch({
          type: productConstants.GET_PRODUCTS_SUCCESS,
          payload: response.data.products,
        });
      })
      .catch((error) => {
        dispatch({
          type: productConstants.GET_PRODUCTS_FAILURE,
          payload: error,
        });
      });
  };
};

export const addProduct = (data) => {
  return async (dispatch) => {
    await http
      .post("/product/create", data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
};
