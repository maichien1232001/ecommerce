import axios from "axios";
import API from "../config/axiosInterceptor";
import { handleError } from "../utils/handleError";

const proxy = "http://localhost:8080/api";

export const getUserOrderApi = async ({ page = 1, limit = 10 }) => {
  const params = {
    page,
    limit,
  };
  try {
    const response = await API.get(`${proxy}/orders/user-order`, {
      params,
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const createOrderApi = async (value) => {
  try {
    const response = await API.post(`${proxy}/orders/create`, value);
    return response?.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateOrderStatusApi = async (values) => {
  try {
    const response = await API.put(`${proxy}/orders/status`, values);
    return response?.data;
  } catch (error) {
    handleError(error);
  }
};
