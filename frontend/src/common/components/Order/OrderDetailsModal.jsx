import React, { memo } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import OrderStatusCards from "./OrderStatusCards";
import OrderInfoCard from "./OrderInfoCard";
import ShippingAddressCard from "./ShippingAddressCard";
import DetailedProductList from "./DetailedProductList";
import OrderTimeline from "./OrderTimeline";

const OrderDetailsModal = memo(({ order, visible, onClose }) => {
  if (!order) return null;

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ShoppingCartOutlined />
          <span>Chi tiết đơn hàng #{order._id.slice(-8)}</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
    >
      <div className="order-details-modal">
        <OrderStatusCards order={order} />
        <OrderInfoCard order={order} />
        <ShippingAddressCard shippingAddress={order.shippingAddress} />
        <DetailedProductList
          products={order.products}
          totalAmount={order.totalAmount}
        />
        <OrderTimeline order={order} />
      </div>
    </Modal>
  );
});

export default OrderDetailsModal;
