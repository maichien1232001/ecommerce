import React, { useState } from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { importFileProducts } from "../../../redux/actions/product.action";

const ImportProducts = () => {
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);

  const dispatch = useDispatch();

  const handleUpload = async () => {
    await dispatch(importFileProducts(file));
    setFile(null);
    setFileList([]);
  };

  return (
    <>
      <Upload
        beforeUpload={(file) => {
          setFile(file);
          setFileList([file]);
          return false;
        }}
        fileList={fileList}
        onRemove={() => {
          setFile(null);
          setFileList([]);
        }}
        showUploadList={true}
        accept=".xls,.xlsx"
      >
        <Button icon={<UploadOutlined />}>Chọn file Excel</Button>
      </Upload>

      <Button
        type="primary"
        onClick={handleUpload}
        disabled={!file}
        style={{ marginTop: 16 }}
      >
        Upload
      </Button>
    </>
  );
};

export default ImportProducts;
