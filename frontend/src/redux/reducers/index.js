// reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import productReducers from "./product.reducers";
import categoryReducers from "./category.reducers";

const rootReducer = combineReducers({
  auths: authReducer,
  products: productReducers,
  category: categoryReducers,
  // Thêm các reducer khác nếu có
});

export default rootReducer;
