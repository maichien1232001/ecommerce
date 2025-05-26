import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import myReducer from "./reducers";

const store = configureStore({
  reducer: myReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
