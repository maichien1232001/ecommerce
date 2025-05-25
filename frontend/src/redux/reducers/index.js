// reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import productReducers from "./product.reducers";
import categoryReducers from "./category.reducers";
import brandReducers from "./brand.reducers";
import userReducers from "./user.reducers";
import addressReducer from "./address.reducers";

const rootReducer = combineReducers({
  auths: authReducer,
  products: productReducers,
  category: categoryReducers,
  brand: brandReducers,
  user: userReducers,
  address: addressReducer,
  // Thêm các reducer khác nếu có
});

export default rootReducer;
