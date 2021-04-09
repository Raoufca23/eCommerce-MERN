import { adminConstants } from "../actions/constants";
const initialState = {
  message: "",
  error: null,
  loading: false,
};

const manageAdminRegistration = (state = initialState, action) => {
  let nextState;
  // console.log(action);
  switch (action.type) {
    case adminConstants.REGISTER_ADMIN_REQUEST:
      nextState = {
        ...state,
        loading: true,
      };
      return nextState || state;
    case adminConstants.REGISTER_ADMIN_SUCCESS:
      nextState = {
        ...state,
        message: action.payload,
        error: null,
        loading: false,
      };
      return nextState || state;
    case adminConstants.REGISTER_ADMIN_FAILURE:
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

export default manageAdminRegistration;
