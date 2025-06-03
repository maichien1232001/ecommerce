import axios from "axios";
import API from "../config/axiosInterceptor";
import { handleError } from "../utils/handleError";

const proxy = "http://localhost:8080/api";

export const getWishListApi = async () => {
  try {
    const res = await API.get(`${proxy}/wishlist/`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const addProductToWishListApi = async (values) => {
  try {
    const res = await API.post(`${proxy}/wishlist/add`, { productId: values });
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const removeProductFromWishListApi = async (value) => {
  try {
    const res = await API.post(`${proxy}/wishlist/delete`, {
      productId: value,
    });
    return res;
  } catch (error) {
    handleError(error);
  }
};
