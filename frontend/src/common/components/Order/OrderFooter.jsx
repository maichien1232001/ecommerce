import React, { memo } from "react";
import { formatCurrency } from "../../../constants/common";
import { Typography } from "antd";

const { Text } = Typography;

const OrderFooter = memo(({ order }) => (
  <div className="order-footer">
    <Text type="secondary">{order.products.length} sản phẩm</Text>
    <div className="total-amount">{formatCurrency(order.totalAmount)}</div>
  </div>
));

export default OrderFooter;
