import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "../../common/components/Tostify";
import API from "../../config/axiosInterceptor";

const proxy = "http://localhost:5000/api";

export const getProducts = async ({
  page = 1,
  limit = 10,
  search = "",
  category = "",
}) => {
  try {
    const params = {
      page,
      limit,
    };

    if (search) params.search = search;
    if (category) params.category = category;

    const response = await API.get(`${proxy}/products`, {
      params,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const importProducs = async (file) => {
  if (!file) {
    notifyWarning("Vui lòng chọn file Excel!", null);
    return;
  }
  const formData = new FormData();
  formData.append("file", file);
  try {
    await API.post(`${proxy}/products/import`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    notifySuccess("Nhập dữ liệu thành công!");
  } catch (error) {
    notifyError("Lỗi khi nhập dữ liệu!");
    console.error(error);
  }
};
