// reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import productReducers from "./product.reducers";

const rootReducer = combineReducers({
  auths: authReducer,
  products: productReducers,
  // Thêm các reducer khác nếu có
});

export default rootReducer;
