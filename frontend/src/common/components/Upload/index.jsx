import { PlusOutlined } from "@ant-design/icons";
import { Upload, message, Spin } from "antd";
import React, { useRef, useState } from "react";
import { deleteImagesApi, uploadImagesApi } from "../../../apis/uploadImg.api";

const UploadImg = ({ fileList, setFileList, form }) => {
  const isProcessing = useRef(false); // Dùng chung cho upload/delete
  const [loading, setLoading] = useState(false);

  const handleChange = async ({ fileList: newList }) => {
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

    try {
      const res = await uploadImagesApi(formData);
      const uploadedImages = res.imageUrls;

      const updatedFileList = newList.map((file, index) => {
        const uploaded = uploadedImages[index];
        return file.originFileObj
          ? {
              ...file,
              url: uploaded.url,
              public_id: uploaded.public_id,
              status: "done",
              uploaded: true,
            }
          : file;
      });

      setFileList(updatedFileList);
      form.setFieldsValue({
        images: updatedFileList.map((f) => f.url),
      });
    } catch (err) {
      message.error("Upload ảnh thất bại");
    } finally {
      isProcessing.current = false;
      setLoading(false);
    }
  };

  const handleRemove = async (file) => {
    if (isProcessing.current) return; // Tránh xóa khi đang xử lý
    isProcessing.current = true;
    setLoading(true);

    try {
      if (file.public_id) await deleteImagesApi(file.public_id);

      const updatedList = fileList.filter((item) => item.uid !== file.uid);
      setFileList(updatedList);
      form.setFieldsValue({
        images: updatedList.map((f) => f.url),
      });
    } catch (err) {
      message.error("Xóa ảnh thất bại");
    } finally {
      isProcessing.current = false;
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Upload
        listType="picture-card"
        name="images"
        multiple
        fileList={fileList}
        showUploadList={{ showPreviewIcon: false }}
        beforeUpload={() => false}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>
    </Spin>
  );
};

export default UploadImg;
