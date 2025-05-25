import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "../../common/components/Tostify";
import API from "../../config/axiosInterceptor";

const proxy = "http://localhost:8080/api";

export const getProducts = async ({
  page = 1,
  limit = 10,
  name = "",
  priceMin,
  priceMax,
  createdFrom,
  createdTo,
  updatedFrom,
  updatedTo,
  inStock,
  category,
  specialTag,
  status,
  brand,
}) => {
  try {
    const params = {
      page,
      limit,
    };

    if (name) params.name = name;
    if (priceMin !== undefined) params.priceMin = priceMin;
    if (priceMax !== undefined) params.priceMax = priceMax;
    if (createdFrom) params.createdFrom = createdFrom;
    if (createdTo) params.createdTo = createdTo;
    if (updatedFrom) params.updatedFrom = updatedFrom;
    if (updatedTo) params.updatedTo = updatedTo;
    if (inStock !== undefined) params.inStock = inStock;
    if (category) params.category = category;
    if (specialTag) params.specialTag = specialTag;
    if (status) params.status = status;
    if (brand) params.brand = brand;

    const response = await API.get(`${proxy}/products`, {
      params,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};

export const importProducts = async (file) => {
  if (!file) {
    notifyWarning("Vui lòng chọn file Excel!", null);
    return;
  }
  const formData = new FormData();
  formData.append("file", file);
  try {
    const res = await API.post(`${proxy}/products/import`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    notifySuccess("Nhập dữ liệu thành công!");
    return res?.data;
  } catch (error) {
    notifyError("Lỗi khi nhập dữ liệu!");
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};

export const addProductApi = async (value) => {
  try {
    const res = await API.post(`${proxy}/products/`, value);

    return res?.data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};

export const viewProductApi = async (id) => {
  try {
    const res = await API.get(`${proxy}/products/${id}`);
    return res?.data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};

export const editProductApi = async (id, value) => {
  try {
    const res = await API.put(`${proxy}/products/${id}`, value);
    return res?.data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};

export const deleteProductApi = async (id) => {
  try {
    const res = await API.delete(`${proxy}/products/${id}`);
    return res?.data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};
