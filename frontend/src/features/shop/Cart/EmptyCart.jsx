import React from "react";
import { Empty, Button, Space } from "antd";
import { ShoppingOutlined, HeartOutlined } from "@ant-design/icons";

const EmptyCart = () => {
  return (
    <div className="cart-container-empty">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span>
            Giỏ hàng trống
            <br />
            Hãy khám phá những sản phẩm tuyệt vời của chúng tôi!
          </span>
        }
      >
        <Space size="middle" className="empty-cart-actions">
          <Button
            type="primary"
            size="large"
            href="/products"
            icon={<ShoppingOutlined />}
            className="shop-now-btn"
          >
            Mua sắm ngay
          </Button>
          <Button
            size="large"
            icon={<HeartOutlined />}
            href="/wishlist"
            className="wishlist-btn"
          >
            Danh sách yêu thích
          </Button>
        </Space>
      </Empty>
    </div>
  );
};

export default EmptyCart;
