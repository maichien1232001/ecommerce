import API from "../config/axiosInterceptor";

const proxy = "http://localhost:8080/api";
export const getListBrandApi = async () => {
  try {
    const res = await API.get(`${proxy}/brand`);

    return res.data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};
