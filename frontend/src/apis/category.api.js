import API from "../config/axiosInterceptor";

const proxy = "http://localhost:8080/api";
export const getListCategoryApi = async () => {
  try {
    const res = await API.get(`${proxy}/category`);

    return res.data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};
