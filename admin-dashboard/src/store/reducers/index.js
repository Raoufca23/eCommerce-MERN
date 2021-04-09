import { combineReducers } from "redux";
import manageAuthentication from "./auth.reducer";
import manageAdminRegistration from "./admin.reducer";
import manageCateogries from "./category.reducer";
import manageProducts from "./product.reducer";

const rootReducer = combineReducers({
  auth: manageAuthentication,
  admin: manageAdminRegistration,
  category: manageCateogries,
  product: manageProducts,
});

export default rootReducer;
