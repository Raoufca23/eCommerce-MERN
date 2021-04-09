import { productConstatns } from "../actions/constants";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const manageProducts = (state = initialState, action) => {
  let nextState;
  console.log(action);
  switch (action.type) {
    case productConstatns.GET_PRODUCT_BY_SLUG_REQUEST:
      nextState = {
        ...state,
        loading: true,
      };
      return nextState || state;
    case productConstatns.GET_PRODUCT_BY_SLUG_SUCCESS:
      nextState = {
        ...state,
        products: action.payload,
        error: null,
        loading: false,
      };
      return nextState || state;
    case productConstatns.GET_PRODUCT_BY_SLUG_FAILURE:
      nextState = {
        ...state,
        message: "",
        error: action.payload.error,
        loading: false,
      };
      return nextState || state;

    default:
      return state;
  }
};

export default manageProducts;
