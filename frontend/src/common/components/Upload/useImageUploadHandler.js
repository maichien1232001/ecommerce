import { useRef, useState } from "react";
import { message } from "antd";
import { deleteImagesApi, uploadImagesApi } from "../../../apis/uploadImg.api";

const useImageUploadHandler = (fileList, setFileList, form) => {
  const isProcessing = useRef(false);
  const [loading, setLoading] = useState(false);

  const handleUploadChange = async ({ fileList: newList }) => {
    const newFiles = newList.filter((f) => !f.uploaded && f.originFileObj);
    if (newFiles.length === 0 || isProcessing.current) {
      setFileList(newList);
      return;
    }

    isProcessing.current = true;
    setLoading(true);

    const formData = new FormData();
    newFiles.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    // Gửi ảnh đã có (để server biết để giữ lại)
    const existingFileData = fileList
      .filter((f) => f.uploaded)
      .map((f) => ({
        url: f.url,
        public_id: f.public_id,
      }));
    formData.append("imagesInfo", JSON.stringify(existingFileData));

    try {
      const res = await uploadImagesApi(formData);
      const allImages = res.images;

      const updatedFileList = allImages.map((img, index) => ({
        uid: `server-${index}`,
        name: `image-${index}`,
        status: "done",
        url: img.url,
        public_id: img.public_id,
        uploaded: true,
      }));

      setFileList(updatedFileList);
      form.setFieldsValue({
        images: allImages.map((img) => img.url),
      });
    } catch (err) {
      console.error(err);
      message.error("Upload ảnh thất bại");
    } finally {
      isProcessing.current = false;
      setLoading(false);
    }
  };

  const handleImageRemove = async (file) => {
    if (isProcessing.current) return false;
    isProcessing.current = true;
    setLoading(true);

    try {
      if (file.public_id) {
        await deleteImagesApi(file.public_id);
      }

      const updatedList = fileList.filter((item) => item.uid !== file.uid);
      setFileList(updatedList);
      form.setFieldsValue({
        images: updatedList.map((f) => f.url),
      });

      return true;
    } catch (err) {
      console.error(err);
      message.error("Xóa ảnh thất bại");
      return false;
    } finally {
      isProcessing.current = false;
      setLoading(false);
    }
  };

  return {
    loading,
    handleUploadChange,
    handleImageRemove,
  };
};

export default useImageUploadHandler;
