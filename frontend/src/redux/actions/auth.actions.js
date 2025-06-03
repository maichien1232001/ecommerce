import { registerApi, loginApi } from "../../apis/auth.api";
import _ from "lodash";
import { checkAdmin } from "../../constants/auth";

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
    token ?? localStorage.setItem("accessToken", token);
    !isAdmin ? navigate("/") : navigate("/admin/products");
  } catch (error) {
    dispatch({
      type: "REGISTER_FAILURE",
      payload: error.message,
    });
  }
};

export const login = (values, navigate, from) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });
  try {
    const response = await loginApi(values);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: response,
    });
    dispatch({
      type: "GET_USER_PROFILE_SUCCESS",
      payload: response?.user,
    });
    const isAdmin = checkAdmin(response?.user);
    const token = _.get(response, "accessToken");
    localStorage.setItem("accessToken", token);
    if (from) {
      navigate(from, { replace: true });
    } else {
      navigate(isAdmin ? "/admin/products" : "/", { replace: true });
    }
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.message,
    });
  }
};
