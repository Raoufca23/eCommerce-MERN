import { authConstants } from "../actions/constants";
const initialState = {
  id: null,
  authenticate: false,
  error: null,
  loading: false,
};

const manageAuthentication = (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      nextState = {
        ...state,
        loading: true,
      };
      return nextState || state;
    case authConstants.LOGIN_SUCCESS:
      nextState = {
        ...state,
        id: action.payload._id,
        authenticate: true,
        loading: false,
      };
      return nextState || state;
    case authConstants.LOGIN_FAILURE:
      nextState = {
        ...state,
        id: null,
        authenticate: false,
        loading: false,
        error: action.error,
      };
      return nextState || state;
    case authConstants.LOGOUT_REQUEST:
      nextState = {
        ...state,
        loading: true,
      };
      return nextState || state;
    case authConstants.LOGOUT_SUCCESS:
      nextState = {
        ...initialState,
      };
      return nextState || state;
    case authConstants.LOGOUT_FAILURE:
      nextState = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      return nextState || state;

    default:
      return state;
  }
};

export default manageAuthentication;
