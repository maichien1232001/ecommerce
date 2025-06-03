import React from "react";
import { Typography } from "antd";
import { GiftOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const OrderTotal = ({ totalQuantity, subtotal, formatCurrency }) => {
  return (
    <div className="order-totals">
      <div className="total-row">
        <Text className="total-label">Tổng số lượng:</Text>
        <Text className="total-value">{totalQuantity} sản phẩm</Text>
      </div>

      <div className="total-row">
        <Text className="total-label">Tạm tính:</Text>
        <Text className="total-value subtotal">{formatCurrency(subtotal)}</Text>
      </div>

      <div className="total-row shipping-row">
        <Text className="total-label">Phí vận chuyển:</Text>
        <div className="shipping-info">
          <GiftOutlined className="gift-icon" />
          <Text className="shipping-free">Miễn phí</Text>
        </div>
      </div>

      <div className="final-total">
        <Title level={4} className="final-label">
          Tổng cộng:
        </Title>
        <Title level={3} className="final-amount">
          {formatCurrency(subtotal)}
        </Title>
      </div>
    </div>
  );
};

export default OrderTotal;
