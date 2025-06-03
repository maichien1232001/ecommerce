import { Space, Tag } from "antd";
import React from "react";
import StatusBadge from "./StatusBadge";
import { CreditCardOutlined } from "@ant-design/icons";

const OrderStatusSection = React.memo(({ order }) => (
  <Space wrap style={{ marginBottom: 16 }}>
    <StatusBadge status={order.status} />
    <StatusBadge status={order.paymentStatus} type="payment" />
    <Tag icon={<CreditCardOutlined />}>{order.paymentMethod}</Tag>
  </Space>
));
export default OrderStatusSection;
