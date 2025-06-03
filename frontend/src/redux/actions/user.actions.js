import {
  changePasswordApi,
  deleteUserProfileApi,
  getUserByIdApi,
  getUserProfileApi,
  managePaymentInfoApi,
  manageShippingAddressesApi,
  updateProfileApi,
} from "../../apis/user.api";
import { notifySuccess } from "../../common/components/Tostify";

export const updateProfileAccount = (values, navigate) => async (dispatch) => {
  dispatch({ type: "UPDATE_PROFILE_REQUEST" });
  try {
    const response = await updateProfileApi(values);
    dispatch({
      type: "UPDATE_PROFILE_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_PROFILE_FAILURE",
      payload: error.message,
    });
  }
};

export const getUserById = (id) => async (dispatch) => {
  dispatch({ type: "GET_USER_BY_ID_REQUEST" });
  try {
    const response = await getUserByIdApi(id);
    dispatch({
      type: "GET_USER_BY_ID_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: "GET_USER_BY_ID_FAILURE",
      payload: error.message,
    });
  }
};

export const changePassword = (values) => async (dispatch) => {
  dispatch({ type: "CHANGE_PASSWORD_REQUEST" });
  try {
    const response = await changePasswordApi(values);
    dispatch({
      type: "CHANGE_PASSWORD_SUCCESS",
      payload: response,
    });
    notifySuccess("Cập nhật mật khẩu thành công");
  } catch (error) {
    console.log(error);
    dispatch({
      type: "CHANGE_PASSWORD_FAILURE",
      payload: error.message,
    });
    notifySuccess(error.message);
  }
};
export const deleteUserProfile = (id) => async (dispatch) => {
  dispatch({ type: "DELETE_USER_PROFILE_REQUEST" });
  try {
    const response = await deleteUserProfileApi(id);
    dispatch({
      type: "DELETE_USER_PROFILE_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_USER_PROFILE_FAILURE",
      payload: error.message,
    });
  }
};
export const managePaymentInfo = (values) => async (dispatch) => {
  dispatch({ type: "MANAGE_PAYMENT_INFO_REQUEST" });
  try {
    const response = await managePaymentInfoApi(values);
    dispatch({
      type: "MANAGE_PAYMENT_INFO_SUCCESS",
      payload: response?.user,
    });
  } catch (error) {
    dispatch({
      type: "MANAGE_PAYMENT_INFO_FAILURE",
      payload: error.message,
    });
  }
};
export const manageShippingAddresses = (values) => async (dispatch) => {
  dispatch({ type: "MANAGE_SHIPPING_ADDRESSES_REQUEST" });
  try {
    const response = await manageShippingAddressesApi(values);
    dispatch({
      type: "MANAGE_SHIPPING_ADDRESSES_SUCCESS",
      payload: response?.user,
    });
  } catch (error) {
    dispatch({
      type: "MANAGE_SHIPPING_ADDRESSES_FAILURE",
      payload: error.message,
    });
  }
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
export const getUserProfile = (token, navigate) => async (dispatch) => {
  dispatch({ type: "GET_USER_PROFILE_REQUEST" });
  try {
    const response = await getUserProfileApi(token);
    dispatch({
      type: "GET_USER_PROFILE_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: "GET_USER_PROFILE_FAILURE",
      payload: error.message,
    });
  }
};
