import axios from "axios";
import API from "../config/axiosInterceptor";

const proxy = "http://localhost:8080/api";

export const getUserByIdApi = async (id) => {
  try {
    const response = await API.post(`${proxy}/profile/${id}`);
    return response.data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};

export const changePasswordApi = async (data) => {
  try {
    const response = await API.put(`${proxy}/profile/change-password`, data);
    return response.data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};

export const updateProfileApi = async (data) => {
  try {
    const response = await API.put(`${proxy}/profile`, data);
    return response.data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};

export const deleteUserProfileApi = async (id) => {
  try {
    const response = await API.delete(`${proxy}/profile/delete/${id}`);
    return response.data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};

export const managePaymentInfoApi = async (data) => {
  try {
    const response = await API.post(`${proxy}/profile/payment`, data);
    return response.data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};

export const manageShippingAddressesApi = async (data) => {
  try {
    const response = await API.post(`${proxy}/profile/shipping`, data);
    return response.data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};

export const getUserProfileApi = async (token) => {
  try {
    const response = await API.get(`${proxy}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};
