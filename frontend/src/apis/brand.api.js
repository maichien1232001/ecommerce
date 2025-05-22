import API from "../config/axiosInterceptor";

const proxy = "http://localhost:8080/api";
export const getListBrandApi = async () => {
  try {
    const res = await API.get(`${proxy}/brand`);

    return res.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Something went wrong"
    );
  }
};
