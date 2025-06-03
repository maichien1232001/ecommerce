import axios from "axios";
import API from "../config/axiosInterceptor";

const proxy = "http://localhost:8080/api";

export const registerApi = async (values) => {
  try {
    const response = await API.post(`${proxy}/auth/register`, values, {
      withCredentials: true,
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

export const loginApi = async (values) => {
  try {
    const response = await API.post(`${proxy}/auth/login`, values, {
      withCredentials: true,
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
