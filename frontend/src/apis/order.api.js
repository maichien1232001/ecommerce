import axios from "axios";
import API from "../config/axiosInterceptor";
const proxy = "http://localhost:8080/api";

const handleError = (error) => {
  const errMsg =
    error?.response?.data?.error ||
    error?.response?.data?.message ||
    "Đã có lỗi xảy ra. Vui lòng thử lại.";
  throw new Error(errMsg);
};

export const getAllOrderApi = async () => {
  try {
    const response = API.get(`${proxy}/orders/`);
    return response?.data;
  } catch (error) {
    handleError();
  }
};

export const createOrderApi = async (value) => {
  try {
    const response = API.post(`${proxy}/orders/create`, value);
    return response?.data;
  } catch (error) {
    handleError();
  }
};
