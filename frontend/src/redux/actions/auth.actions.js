// actions/productActions.js
import { registerApi, loginApi } from "../../apis/auth.api";
import _ from "lodash";

export const register = (values, navigate) => async (dispatch) => {
  dispatch({ type: "REGISTER_REQUEST" });
  try {
    const response = await registerApi(values);
    dispatch({
      type: "REGISTER_SUCCESS",
      payload: response.user,
    });
    const isAdmin = checkAdmin(response);
    const token = _.get(response, "accessToken");
    token ?? localStorage.setItem("authToken", token);
    !isAdmin ? navigate("/") : navigate("/admin/products");
  } catch (error) {
    dispatch({
      type: "REGISTER_FAILURE",
      payload: error.message,
    });
  }
};

export const login = (values, navigate) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });
  try {
    const response = await loginApi(values);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: response,
    });
    const isAdmin = checkAdmin(response);
    const token = _.get(response, "accessToken");
    localStorage.setItem("authToken", token);
    !isAdmin ? navigate("/") : navigate("/admin/products");
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.message,
    });
  }
};

export const checkAdmin = (data) => {
  return _.get(data, "user.role") === "admin" ?? true;
};

export const saveUser = (values) => async (dispatch) => {
  dispatch({ type: "SAVE_USER_REQUEST" });
  try {
    dispatch({
      type: "SAVE_USER_SUCCESS",
      payload: values,
    });
  } catch (error) {
    dispatch({
      type: "SAVE_USER_FAILURE",
      payload: error.message,
    });
  }
};
