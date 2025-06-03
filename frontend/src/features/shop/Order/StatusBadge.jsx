import React from "react";
import { Tag } from "antd";

import { STATUS_CONFIG } from "../../../constants/order";

const StatusBadge = React.memo(({ status, type = "order" }) => {
  const config = STATUS_CONFIG[type][status] || {
    color: "default",
    text: status,
  };
  return <Tag color={config.color}>{config.text}</Tag>;
});
export default StatusBadge;
