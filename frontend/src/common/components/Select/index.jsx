import React from "react";
import { Select } from "antd";

const CommonSelect = ({
  options = [],
  value,
  onChange,
  getValue, // (item) => giá trị so sánh
  getLabel, // (item) => label hiển thị
  placeholder,
  disabled,
  labelInValue = false,
}) => {
  // Tìm đúng option nếu đang dùng labelInValue
  const formattedValue = labelInValue
    ? value && getValue && getLabel
      ? { value: getValue(value), label: getLabel(value) }
      : undefined
    : getValue
    ? getValue(value)
    : value;

  const handleChange = (option) => {
    if (labelInValue) {
      const selected = options.find((item) => getValue(item) === option.value);
      onChange?.(selected); // trả về object đầy đủ
    } else {
      onChange?.(option); // trả về value đơn giản
    }
  };

  return (
    <Select
      disabled={disabled}
      placeholder={placeholder}
      style={{ width: "100%" }}
      value={formattedValue}
      labelInValue={labelInValue}
      onChange={handleChange}
    >
      {options.map((item) => (
        <Select.Option key={getValue(item)} value={getValue(item)}>
          {getLabel(item)}
        </Select.Option>
      ))}
    </Select>
  );
};

export default CommonSelect;
