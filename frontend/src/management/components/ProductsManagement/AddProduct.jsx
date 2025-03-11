import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const ImportProducts = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      message.warning("Vui lòng chọn file Excel!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/products/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Nhập dữ liệu thành công!");
    } catch (error) {
      message.error("Lỗi khi nhập dữ liệu!");
      console.error(error);
    }
  };

  return (
    <>
      <Upload
        beforeUpload={(file) => {
          setFile(file);
          return false;
        }}
        showUploadList={true}
        accept=".xls,.xlsx"
      >
        <Button icon={<UploadOutlined />}>Chọn file Excel</Button>
      </Upload>
      <Button type="primary" onClick={handleUpload} style={{ marginTop: 10 }}>
        Tải lên & Nhập dữ liệu
      </Button>
    </>
  );
};

export default ImportProducts;
