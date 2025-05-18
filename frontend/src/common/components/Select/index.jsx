import React from "react";
import { Select } from "antd";
import { useSelector } from "react-redux";

const { Option } = Select;

const CategorySelect = ({ placeholder, value, onChange }) => {
  const listCategories = useSelector((state) => state.category.category);
  return (
    <Select
      placeholder={placeholder}
      style={{ width: "100%" }}
      labelInValue
      value={value ? { value: value._id, label: value.name } : undefined}
      onChange={(option) => {
        const selected = listCategories.find((cat) => cat._id === option.value);
        onChange(selected);
      }}
    >
      {listCategories.map((cat) => (
        <Option key={cat._id} value={cat._id}>
          {cat.name}
        </Option>
      ))}
    </Select>
  );
};

export default CategorySelect;
