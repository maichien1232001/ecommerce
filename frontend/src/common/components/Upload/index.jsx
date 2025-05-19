// components/UploadImg.jsx
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Spin } from "antd";
import React from "react";
import useImageUploadHandler from "./useImageUploadHandler";

const UploadImg = ({ fileList, setFileList, form }) => {
  const { loading, handleUploadChange, handleImageRemove } =
    useImageUploadHandler(fileList, setFileList, form);

  return (
    <Spin spinning={loading}>
      <Upload
        listType="picture-card"
        name="images"
        multiple
        fileList={fileList}
        showUploadList={{ showPreviewIcon: false }}
        beforeUpload={() => false}
        onChange={handleUploadChange}
        onRemove={handleImageRemove}
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
