import React, { useMemo, useCallback } from "react";
import { Select } from "antd";
import { get, isNil } from "lodash";

const CommonSelect = ({
  options = [],
  value,
  onChange,
  getValue = (item) => get(item, "value"),
  getLabel = (item) => get(item, "label"),
  placeholder,
  disabled,
  defaultValue,
  labelInValue = false,
  allowClear,
}) => {
  const formattedValue = useMemo(() => {
    if (labelInValue) {
      if (!isNil(value)) {
        return {
          value: getValue(value),
          label: getLabel(value),
        };
      }
      return undefined;
    }
    return isNil(value) ? undefined : getValue(value);
  }, [value, getValue, getLabel, labelInValue]);

  const handleChange = useCallback(
    (option) => {
      if (labelInValue) {
        const selected = options.find(
          (item) => getValue(item) === option?.value
        );
        onChange?.(selected);
      } else {
        onChange?.(option);
      }
    },
    [labelInValue, options, onChange, getValue]
  );

  return (
    <Select
      defaultValue={defaultValue}
      disabled={disabled}
      placeholder={placeholder}
      style={{ width: "100%" }}
      value={formattedValue}
      labelInValue={labelInValue}
      onChange={handleChange}
      allowClear={allowClear}
    >
      {options.map((item) => (
        <Select.Option key={getValue(item)} value={getValue(item)}>
          {getLabel(item)}
        </Select.Option>
      ))}
    </Select>
  );
};

export default React.memo(CommonSelect);
