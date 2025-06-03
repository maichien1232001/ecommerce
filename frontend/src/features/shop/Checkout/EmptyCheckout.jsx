import React from "react";
import { Empty, Button } from "antd";
import { ShoppingCartOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const EmptyCheckout = () => {
  const navigate = useNavigate();

  const handleBackToShopping = () => {
    navigate("/products");
  };

  return (
    <div className="empty-checkout-container">
      <div className="empty-checkout-content">
        <Empty
          image={
            <div className="empty-icon">
              <ShoppingCartOutlined />
            </div>
          }
          imageStyle={{
            height: 120,
          }}
          description={
            <div className="empty-description">
              <h3>Giỏ hàng trống</h3>
              <p>
                Bạn chưa có sản phẩm nào để thanh toán. Hãy thêm sản phẩm vào
                giỏ hàng trước!
              </p>
            </div>
          }
        >
          <div className="empty-actions">
            <Button
              type="primary"
              size="large"
              icon={<ArrowLeftOutlined />}
              onClick={handleBackToShopping}
              className="back-to-shopping-btn"
            >
              Tiếp tục mua sắm
            </Button>
          </div>
        </Empty>
      </div>
    </div>
  );
};

export default EmptyCheckout;
