import React, { memo } from "react";
import { Input } from "antd";

const ProductNameFilter = ({ label = "Tên sản phẩm:", onFilter }) => {
  const handleChange = (e) => {
    const value = e.target.value?.trim();
    onFilter?.(value);
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ marginRight: 8, fontSize: 14 }}>{label}</label>
      <div>
        <Input
          placeholder="Nhập tên sản phẩm"
          onPressEnter={handleChange}
          style={{ width: 260 }}
          allowClear
        />
      </div>
    </div>
  );
};

export default memo(ProductNameFilter);
