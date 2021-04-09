import http from "../../helpers";
import { productConstatns } from "./constants";

export const getProductBySlug = (slug) => {
  return async (dispatch) => {
    dispatch({
      type: productConstatns.GET_PRODUCT_BY_SLUG_REQUEST,
    });
    await http
      .get(`/product/${slug}`)
      .then((response) => {
        const { products } = response.data;
        dispatch({
          type: productConstatns.GET_PRODUCT_BY_SLUG_SUCCESS,
          payload: products,
        });
      })
      .catch((error) => {
        dispatch({
          type: productConstatns.GET_PRODUCT_BY_SLUG_FAILURE,
          payload: error,
        });
      });
  };
};
