import { productConstants } from "../actions/constants";

const initialState = {
  products: [],
  loading: false,
  error: null,
  message: "",
};

const manageProducts = (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case productConstants.GET_PRODUCTS_REQUEST:
      nextState = {
        ...state,
        loading: true,
      };
      return nextState || state;
    case productConstants.GET_PRODUCTS_SUCCESS:
      nextState = {
        ...state,
        products: action.payload,
        error: null,
        loading: false,
      };
      return nextState || state;
    case productConstants.GET_PRODUCTS_FAILURE:
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
