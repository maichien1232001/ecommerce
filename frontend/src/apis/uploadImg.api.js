import { notifyError, notifySuccess } from "../common/components/Tostify";
import API from "../config/axiosInterceptor";

const proxy = "http://localhost:8080/api";

export const uploadImagesApi = async (formData) => {
  try {
    const res = await API.post(`${proxy}/cloudinary/upload-images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data; // chứa imageUrls: [{ url, public_id }]
  } catch (error) {
    notifyError("Lỗi khi upload ảnh", null);
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};

export const deleteImagesApi = async (publicId) => {
  try {
    await API.post(`${proxy}/cloudinary/delete-image`, {
      public_id: publicId,
    });
  } catch (error) {
    console.log(error);
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};
