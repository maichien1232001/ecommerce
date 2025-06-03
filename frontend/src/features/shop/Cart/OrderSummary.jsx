import React from "react";
import { Card, Typography, Divider, Button } from "antd";
import {
  DollarCircleOutlined,
  CreditCardOutlined,
  ShoppingOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const OrderSummary = ({
  selectedItemsCount,
  selectedQuantity,
  subtotal,
  total,
  onCheckout,
  isDisabled,
  formatCurrency,
}) => {
  return (
    <Card className="order-summary-card">
      <Title level={3} className="summary-title">
        <DollarCircleOutlined />
        Tóm tắt đơn hàng
      </Title>

      <div className="summary-details">
        <div className="summary-row">
          <Text>Sản phẩm đã chọn:</Text>
          <Text strong>{selectedItemsCount} sản phẩm</Text>
        </div>

        <div className="summary-row">
          <Text>Tổng số lượng:</Text>
          <Text strong>{selectedQuantity}</Text>
        </div>

        <div className="summary-row">
          <Text>Tạm tính:</Text>
          <Text strong>{formatCurrency(subtotal * 1.2)}</Text>
        </div>

        <div className="summary-row">
          <Text>Phí vận chuyển:</Text>
          <Text strong className="free-shipping">
            Miễn phí
          </Text>
        </div>

        <div className="summary-row">
          <Text>Giảm giá:</Text>
          <Text strong className="discount">
            -{formatCurrency(subtotal * 0.2)}
          </Text>
        </div>

        <Divider />

        <div className="summary-row total-row">
          <Text strong className="total-label">
            Tổng thanh toán:
          </Text>
          <Text strong className="total-amount">
            {formatCurrency(subtotal * 1.2 - subtotal * 0.2)}
          </Text>
        </div>
      </div>

      <div className="checkout-actions">
        <Button
          type="primary"
          size="large"
          block
          icon={<CreditCardOutlined />}
          onClick={onCheckout}
          disabled={isDisabled}
          className="checkout-btn"
        >
          Thanh toán ({selectedItemsCount})
        </Button>

        <Button
          size="large"
          block
          icon={<ShoppingOutlined />}
          href="/products"
          className="continue-shopping-btn"
        >
          Tiếp tục mua sắm
        </Button>
      </div>

      <div className="security-info">
        <SafetyCertificateOutlined />
        <Text>Thanh toán được bảo mật bởi SSL 256-bit</Text>
      </div>
    </Card>
  );
};

export default OrderSummary;
