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
    throw new Error(error.response?.data?.message || "Lỗi khi upload ảnh");
  }
};

export const deleteImagesApi = async (publicId) => {
  try {
    await API.post(`${proxy}/cloudinary/delete-image`, {
      public_id: publicId,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Lỗi khi xóa ảnh");
  }
};
