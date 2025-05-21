import React, { memo } from "react";
import { Select } from "antd";

const { Option } = Select;

const options = [
  { label: "Tất cả", value: "all" },
  { label: "Còn hàng", value: "inStock" },
  { label: "Hết hàng", value: "outOfStock" },
  { label: "Sắp hết", value: "lowStock" },
];

const StockFilter = ({ label = "Tồn kho:", onFilter }) => {
  const handleChange = (value) => {
    onFilter?.(value);
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ marginRight: 8, fontSize: 14 }}>{label}</label>
      <div>
        <Select
          defaultValue="all"
          onChange={handleChange}
          style={{ width: 200 }}
          allowClear
        >
          {options.map((opt) => (
            <Option key={opt.value} value={opt.value}>
              {opt.label}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default memo(StockFilter);
