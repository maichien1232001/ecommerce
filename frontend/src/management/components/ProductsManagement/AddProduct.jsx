import React, { useState } from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { importProducs } from "../../../apis/products";

const ImportProducts = () => {
  const [file, setFile] = useState(null);

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
      <Button
        type="primary"
        onClick={() => importProducs(file)}
        style={{ marginTop: 10 }}
      >
        Tải lên & Nhập dữ liệu
      </Button>
    </>
  );
};

export default ImportProducts;
