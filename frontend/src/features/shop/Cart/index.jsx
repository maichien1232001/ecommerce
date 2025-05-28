import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Typography,
  Card,
  Divider,
  Empty,
  Button,
  InputNumber,
  Spin,
  message,
} from "antd";
import {
  DeleteOutlined,
  ShoppingCartOutlined,
  ReloadOutlined,
  DollarCircleOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import "./Cart.scss";
import {
  deleteCart,
  updateItemQuantity,
} from "../../../redux/actions/cart.actions";
import { notifyError } from "../../../common/components/Tostify";
import BackButton from "../../../common/components/BackButton";

const { Title, Text } = Typography;

const Cart = () => {
  const dispatch = useDispatch();

  const { carts: cartItems, totalPrice: cartTotalPrice } = useSelector(
    (state) => state.cart
  );

  const { user } = useSelector((state) => state.auth || state?.user);
  const isAuthenticated = !!user?._id;

  const [isRemovingItem, setIsRemovingItem] = useState(false);
  const [isUpdatingItem, setIsUpdatingItem] = useState({});
  const [changedQuantities, setChangedQuantities] = useState({});

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleRemoveItem = async (productId) => {
    setIsRemovingItem(true);
    try {
      let sessionID = null;
      if (!isAuthenticated) {
        sessionID = localStorage.getItem("sessionID");

        if (!sessionID) {
          notifyError(
            "Không tìm thấy sessionID. Vui lòng đăng nhập hoặc thử lại."
          );
          setIsRemovingItem(false);
          return;
        }
        dispatch(deleteCart(null, sessionID, productId));
      } else {
        dispatch(deleteCart(user?._id, null, productId));
      }

      setChangedQuantities((prev) => {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      });
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
    } finally {
      setIsRemovingItem(false);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      message.warning("Số lượng phải lớn hơn 0.");
      return;
    }

    const stockLimit = cartItems.find(
      (item) => item.productId._id === productId
    )?.productId.stock;

    if (newQuantity > stockLimit) {
      message.warning(`Số lượng không được vượt quá tồn kho (${stockLimit}).`);
      return;
    }

    setChangedQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
  };

  const handleUpdateItemQuantity = (productId) => {
    const sessionID = localStorage.getItem("sessionID");
    const newQuantity = changedQuantities[productId];
    if (newQuantity === undefined) return; // Only update if quantity actually changed

    setIsUpdatingItem((prev) => ({ ...prev, [productId]: true }));

    try {
      const userId = isAuthenticated ? user._id : null;
      if (userId) {
        dispatch(updateItemQuantity(userId, null, productId, newQuantity));
      } else {
        dispatch(updateItemQuantity(null, sessionID, productId, newQuantity));
      }

      setChangedQuantities((prev) => {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdatingItem((prev) => ({ ...prev, [productId]: false }));
    }
  };

  if (isRemovingItem) {
    return (
      <div className="cart-container-loading">
        <Spin size="large" tip="Đang xử lý..." />
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-container-empty">
        <Empty
          image={
            <ShoppingCartOutlined style={{ fontSize: 80, color: "#999" }} />
          }
          description={
            <Text strong className="empty-cart-text">
              Giỏ hàng của bạn đang trống!
            </Text>
          }
        >
          <Button
            type="primary"
            size="large"
            href="/products"
            icon={<ShoppingOutlined />}
          >
            Mua sắm ngay
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <BackButton fallbackPath="/products">Quay lại</BackButton>
      <Title level={2} className="cart-page-title">
        Giỏ hàng của bạn
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <div className="cart-items-list">
            {cartItems.map((item) => {
              const currentQuantity =
                changedQuantities[item.productId._id] !== undefined
                  ? changedQuantities[item.productId._id]
                  : item.quantity;

              const hasQuantityChanged =
                changedQuantities[item.productId._id] !== undefined;
              const isUpdatingThisItem = isUpdatingItem[item.productId._id];

              return (
                <Card key={item._id} className="cart-item-card">
                  <Row align="middle" gutter={[16, 16]}>
                    <Col xs={24} sm={6}>
                      <div className="cart-item-image-wrapper">
                        <img
                          src={
                            item.productId.images &&
                            item.productId.images.length > 0
                              ? item.productId.images[0]
                              : "https://via.placeholder.com/150" // Increased placeholder size
                          }
                          alt={item.productId.name}
                          className="cart-item-image"
                        />
                      </div>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Title level={4} className="cart-item-name">
                        {item.productId.name}
                      </Title>
                      <Text className="cart-item-price-per-unit">
                        Giá:{" "}
                        <Text strong>
                          {formatCurrency(item.productId.price)}
                        </Text>
                      </Text>
                      <div
                        className="cart-item-quantity-control"
                        style={{ marginBottom: 16 }}
                      >
                        <Text strong>Số lượng:</Text>
                        <InputNumber
                          min={1}
                          max={item.productId.stock}
                          value={currentQuantity}
                          onChange={(value) =>
                            handleQuantityChange(item.productId._id, value)
                          }
                          className="quantity-input"
                          disabled={isRemovingItem || isUpdatingThisItem}
                        />
                      </div>
                      <Text strong className="cart-item-subtotal">
                        Tổng cộng:{" "}
                        <span className="total-item-price">
                          {formatCurrency(
                            currentQuantity * item.productId.price
                          )}
                        </span>
                      </Text>
                    </Col>
                    <Col xs={24} sm={6} className="cart-item-actions">
                      <div className="action-buttons-group">
                        {hasQuantityChanged && (
                          <Button
                            type="primary"
                            icon={<ReloadOutlined />}
                            onClick={() =>
                              handleUpdateItemQuantity(item.productId._id)
                            }
                            loading={isUpdatingThisItem}
                            disabled={isRemovingItem}
                            size="middle"
                            className="update-button"
                          >
                            Cập nhật
                          </Button>
                        )}
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemoveItem(item.productId._id)}
                          className="remove-item-button"
                          loading={isRemovingItem}
                          disabled={isUpdatingThisItem}
                          size="middle"
                        >
                          Xóa
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </div>
        </Col>

        <Col xs={24} lg={8}>
          <Card className="cart-summary-card">
            <Title level={4} className="summary-title">
              Tóm tắt đơn hàng
            </Title>
            <Divider className="summary-divider" />
            <div className="summary-row">
              <Text>Tổng số sản phẩm:</Text>
              <Text strong className="summary-value">
                {cartItems.reduce((total, item) => {
                  const q =
                    changedQuantities[item.productId._id] !== undefined
                      ? changedQuantities[item.productId._id]
                      : item.quantity;
                  return total + q;
                }, 0)}
              </Text>
            </div>
            <div className="summary-row total-price">
              <Text className="total-label">Tổng tiền hàng:</Text>
              <Text strong className="final-price">
                {formatCurrency(cartTotalPrice)}
              </Text>
            </div>

            <Button
              type="primary"
              size="large"
              block
              className="checkout-button"
              icon={<DollarCircleOutlined />}
              disabled={
                isRemovingItem ||
                Object.values(isUpdatingItem).some(Boolean) ||
                cartItems.length === 0
              }
            >
              Tiến hành thanh toán
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
