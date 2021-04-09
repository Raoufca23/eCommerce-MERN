import { combineReducers } from "redux";
import manageCateogries from "./category.reducer";
import manageProducts from "./product.reducer";

const rootReducer = combineReducers({
  category: manageCateogries,
  product: manageProducts,
});

export default rootReducer;
