import API from "../config/axiosInterceptor";
import { handleError } from "../utils/handleError";

const proxy = "http://localhost:8080/api";
export const getListCategoryApi = async ({
  page = 1,
  limit = 10,
  name = "",
} = {}) => {
  try {
    const params = {
      page,
      limit,
    };
    if (name) params.name = name;
    const res = await API.get(`${proxy}/category`, {
      params,
    });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const createCategoryApi = async (values) => {
  try {
    const res = await API.post(`${proxy}/`, {
      values,
    });
    return res?.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateItemCategoryApi = async (values) => {
  try {
    const res = await API.put(`${proxy}/update`, {
      values,
    });
    return res?.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteItemCategoryApi = async (values) => {
  try {
    const res = await API.post(`${proxy}/delete`, {
      values,
    });
    return res?.data;
  } catch (error) {
    handleError(error);
  }
};
