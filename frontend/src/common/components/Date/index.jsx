import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Select, DatePicker } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import _ from "lodash";
import { useDispatch } from "react-redux";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.extend(isBetween);

const { Option } = Select;
const { RangePicker } = DatePicker;

const dateOptions = [
  { value: "null", label: "Tất cả" },
  { value: "today", label: "Hôm nay" },
  { value: "yesterday", label: "Hôm qua" },
  { value: "last7days", label: "7 ngày gần đây" },
  { value: "last4weeks", label: "4 tuần gần đây" },
  { value: "last12months", label: "12 tháng gần đây" },
  { value: "custom", label: "Tùy chọn" },
];

const DateFieldFilter = ({
  field = "createdAt",
  data = [],
  label,
  onDateChange, // mới: callback khi có khoảng thời gian
}) => {
  const [filterOption, setFilterOption] = useState("null");
  const [customRange, setCustomRange] = useState([]);

  const dateRange = useMemo(() => {
    if (filterOption === "null") return null;

    const now = dayjs().tz("Asia/Ho_Chi_Minh"); // 👈 dùng timezone VN
    let fromDate = null;
    let toDate = now.endOf("day");

    if (filterOption === "custom") {
      if (!customRange || customRange.length !== 2) return null;
      fromDate = customRange[0].startOf("day");
      toDate = customRange[1].endOf("day");
    } else {
      switch (filterOption) {
        case "today":
          fromDate = now.startOf("day");
          break;
        case "yesterday":
          fromDate = now.subtract(1, "day").startOf("day");
          toDate = now.subtract(1, "day").endOf("day"); // 👈 thiếu dòng này
          break;
        case "last7days":
          fromDate = now.subtract(6, "day").startOf("day");
          break;
        case "last4weeks":
          fromDate = now.subtract(4, "week").startOf("day");
          break;
        case "last12months":
          fromDate = now.subtract(12, "month").startOf("month");
          break;
        default:
          return null;
      }
    }

    return {
      from: fromDate.toDate(),
      to: toDate.toDate(),
    };
  }, [filterOption, customRange]);

  useEffect(() => {
    if (filterOption === "null" && onDateChange) {
      if (field === "createdAt") {
        onDateChange({ createdFrom: "", createdTo: "" });
      } else if (field === "updatedAt") {
        onDateChange({ updatedFrom: "", updatedTo: "" });
      }
    }
  }, [filterOption]);

  useEffect(() => {
    if (!dateRange || !onDateChange) return;

    if (field === "createdAt") {
      onDateChange({
        createdFrom: dateRange.from.toISOString(),
        createdTo: dateRange.to.toISOString(),
      });
    } else if (field === "updatedAt") {
      onDateChange({
        updatedFrom: dateRange.from.toISOString(),
        updatedTo: dateRange.to.toISOString(),
      });
    }
  }, [filterOption, customRange]);

  return (
    <div style={{ marginBottom: 12 }}>
      {label && <label style={{ marginRight: 8, fontSize: 14 }}>{label}</label>}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Select
          value={filterOption}
          onChange={(val) => {
            const selected = val ?? "null";
            setFilterOption(selected);
            if (selected !== "custom") setCustomRange([]);
          }}
          style={{ width: "100%" }}
          allowClear
        >
          {dateOptions.map((opt) => (
            <Option key={opt.value} value={opt.value}>
              {opt.label}
            </Option>
          ))}
        </Select>

        {filterOption === "custom" && (
          <RangePicker
            value={customRange}
            onChange={(dates) => setCustomRange(dates || [])}
            allowClear
            style={{ minWidth: 260 }}
            format="DD/MM/YYYY"
          />
        )}
      </div>
    </div>
  );
};

export default DateFieldFilter;
