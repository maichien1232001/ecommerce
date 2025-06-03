import axios from "axios";
import API from "../config/axiosInterceptor";
import { handleError } from "../utils/handleError";

const proxy = "http://localhost:8080/api";

export const registerApi = async (values) => {
  try {
    const response = await API.post(`${proxy}/auth/register`, values, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const loginApi = async (values) => {
  try {
    const response = await API.post(`${proxy}/auth/login`, values, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
