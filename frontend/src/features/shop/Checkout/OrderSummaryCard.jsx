import React from "react";
import { Card, Typography, Divider, Button, Form } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";
import ProductItem from "./ProductItem";
import OrderTotal from "./OrderTotal";
import { useSelector } from "react-redux";
import _ from "lodash";
import { formatCurrency } from "../../../constants/common";

const { Title } = Typography;

const OrderSummaryCard = ({
  buyNowProduct,
  checkoutItems,
  isSingleProductCheckout,
  isMultipleItemsCheckout,
  onSubmit,
  loading,
}) => {
  const calculateTotal = () => {
    if (isSingleProductCheckout) {
      return buyNowProduct.price;
    } else if (isMultipleItemsCheckout) {
      return checkoutItems.reduce((total, item) => {
        return total + item.productId.price * item.quantity;
      }, 0);
    }
    return 0;
  };

  const calculateTotalQuantity = () => {
    if (isSingleProductCheckout) {
      return 1;
    } else if (isMultipleItemsCheckout) {
      return checkoutItems.reduce((total, item) => total + item.quantity, 0);
    }
    return 0;
  };

  const [form] = Form.useForm();
  const handlePlaceOrder = async () => {
    const paymentInfo = await form.validateFields();
    onSubmit({
      items: isSingleProductCheckout ? [buyNowProduct] : checkoutItems,
      total: calculateTotal(),
      quantity: calculateTotalQuantity(),
      paymentInfo,
    });
  };

  return (
    <div className="summary-container">
      <Card className="summary-card">
        <div className="card-header summary-header">
          <div className="card-icon summary-icon">
            <Title level={4} className="card-title">
              Tóm tắt đơn hàng
            </Title>
          </div>
          <div className="card-title-section">
            <div className="card-subtitle">
              {calculateTotalQuantity()} sản phẩm trong đơn hàng
            </div>
          </div>
        </div>

        <Divider className="card-divider" />

        <div className="products-section">
          {isSingleProductCheckout && (
            <ProductItem
              product={buyNowProduct}
              quantity={1}
              isSingle={true}
              formatCurrency={formatCurrency}
            />
          )}

          {isMultipleItemsCheckout && (
            <div className="multiple-products">
              {checkoutItems.map((item, index) => (
                <React.Fragment key={item._id}>
                  <ProductItem
                    product={item.productId}
                    quantity={item.quantity}
                    isSingle={false}
                    formatCurrency={formatCurrency}
                  />
                  {index < checkoutItems.length - 1 && (
                    <Divider className="product-divider" />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        <Divider className="summary-divider" />

        <OrderTotal
          totalQuantity={calculateTotalQuantity()}
          subtotal={calculateTotal()}
          formatCurrency={formatCurrency}
        />

        <div className="order-actions">
          <Button
            type="primary"
            size="large"
            block
            className="place-order-btn"
            loading={loading}
            icon={<DollarCircleOutlined />}
            onClick={handlePlaceOrder}
          >
            <span className="btn-text">Đặt hàng ngay •</span>
            <span className="btn-price">
              {formatCurrency(calculateTotal())}
            </span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OrderSummaryCard;
