import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import productReducers from "./product.reducers";
import categoryReducers from "./category.reducers";
import brandReducers from "./brand.reducers";
import userReducers from "./user.reducers";
import addressReducer from "./address.reducers";
import cartReducer from "./cart.reducers";
import wishlistReducer from "./wishlist.reducers";
import orderReducer from "./order.reducers";

const appReducer = combineReducers({
  auths: authReducer,
  products: productReducers,
  category: categoryReducers,
  brand: brandReducers,
  user: userReducers,
  address: addressReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  order: orderReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
