import API from "../config/axiosInterceptor";

const proxy = "http://localhost:5000/api";
export const getListCategoryApi = async () => {
  try {
    const res = await API.get(`${proxy}/category`);

    return res.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Something went wrong"
    );
  }
};
