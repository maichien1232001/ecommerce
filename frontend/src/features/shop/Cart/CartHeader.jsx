import React from "react";
import { Typography, Badge } from "antd";
import { SafetyCertificateOutlined } from "@ant-design/icons";
import BackButton from "../../../common/components/BackButton";

const { Title, Text } = Typography;

const CartHeader = () => {
  return (
    <div className="cart-header">
      <BackButton fallbackPath="/products" className="modern-back-btn">
        <span>Tiếp tục mua sắm</span>
      </BackButton>

      <div className="cart-title-section">
        <Title level={1} className="cart-main-title">
          Giỏ hàng của bạn
        </Title>
        <Text className="cart-subtitle">
          Quản lý và thanh toán các sản phẩm yêu thích
        </Text>
      </div>

      <div className="cart-security-badge">
        <SafetyCertificateOutlined />
        <span>Thanh toán an toàn 100%</span>
      </div>
    </div>
  );
};

export default CartHeader;
