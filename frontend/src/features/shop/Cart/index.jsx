import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Spin } from "antd";
import {
  deleteCart,
  updateItemQuantity,
} from "../../../redux/actions/cart.actions";
import { notifyError, notifyWarning } from "../../../common/components/Tostify";
import "./Cart.scss";

import CartHeader from "./CartHeader";
import EmptyCart from "./EmptyCart";
import CartControls from "./CartControls";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import PromoCard from "./PromoCard";
import {
  setBuyNowProduct,
  setCheckoutItems,
} from "../../../redux/actions/product.action";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { carts: cartItems, totalPrice: cartTotalPrice } = useSelector(
    (state) => state.cart
  );

  const { user } = useSelector((state) => state?.user);
  const isAuthenticated = !!user?._id;

  const [isRemovingItem, setIsRemovingItem] = useState(false);
  const [isUpdatingItem, setIsUpdatingItem] = useState({});
  const [changedQuantities, setChangedQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

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

      setSelectedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
    } finally {
      setIsRemovingItem(false);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      notifyWarning("Số lượng phải lớn hơn 0.");
      return;
    }

    const stockLimit = cartItems.find(
      (item) => item.productId._id === productId
    )?.productId.stock;

    if (newQuantity > stockLimit) {
      notifyWarning(`Số lượng không được vượt quá tồn kho (${stockLimit}).`);
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
    if (newQuantity === undefined) return;

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

  const handleSelectItem = (productId, checked) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(productId);
      } else {
        newSet.delete(productId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedItems(new Set(cartItems.map((item) => item.productId._id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleCheckoutSingle = async (productId) => {
    dispatch(setBuyNowProduct(productId));
    navigate("/checkout");
  };

  const handleCheckoutSelected = () => {
    if (selectedItems.size === 0) {
      notifyWarning("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }

    const selectedCartItems = cartItems
      .filter((item) => selectedItems.has(item.productId._id))
      .map((item) => ({
        ...item,
        quantity:
          changedQuantities[item.productId._id] !== undefined
            ? changedQuantities[item.productId._id]
            : item.quantity,
      }));

    dispatch(setCheckoutItems(selectedCartItems));

    navigate("/checkout");
  };

  const getSelectedTotalPrice = () => {
    return cartItems
      .filter((item) => selectedItems.has(item.productId._id))
      .reduce((total, item) => {
        const quantity =
          changedQuantities[item.productId._id] !== undefined
            ? changedQuantities[item.productId._id]
            : item.quantity;
        return total + item.productId.price * quantity;
      }, 0);
  };

  const getSelectedItemCount = () => {
    return cartItems
      .filter((item) => selectedItems.has(item.productId._id))
      .reduce((total, item) => {
        const quantity =
          changedQuantities[item.productId._id] !== undefined
            ? changedQuantities[item.productId._id]
            : item.quantity;
        return total + quantity;
      }, 0);
  };

  if (isRemovingItem) {
    return (
      <div className="cart-container-loading">
        <Spin size="large" tip="Đang xử lý..." />
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return <EmptyCart />;
  }

  const subtotal = getSelectedTotalPrice();

  return (
    <div className="modern-cart-container">
      <CartHeader />

      <Row gutter={[32, 32]} className="cart-main-content">
        <Col xs={24} xl={16}>
          <Card className="cart-items-container">
            <CartControls
              selectAll={selectAll}
              onSelectAll={handleSelectAll}
              totalItems={cartItems.length}
            />

            <div className="cart-items-list">
              {cartItems.map((item) => {
                const currentQuantity =
                  changedQuantities[item.productId._id] !== undefined
                    ? changedQuantities[item.productId._id]
                    : item.quantity;

                const hasQuantityChanged =
                  changedQuantities[item.productId._id] !== undefined;
                const isUpdatingThisItem = isUpdatingItem[item.productId._id];
                const isSelected = selectedItems.has(item.productId._id);

                return (
                  <CartItem
                    key={item._id}
                    item={item}
                    isSelected={isSelected}
                    currentQuantity={currentQuantity}
                    hasQuantityChanged={hasQuantityChanged}
                    isUpdating={isUpdatingThisItem}
                    isRemoving={isRemovingItem}
                    onSelect={handleSelectItem}
                    onQuantityChange={handleQuantityChange}
                    onUpdate={handleUpdateItemQuantity}
                    onCheckoutSingle={handleCheckoutSingle}
                    onRemove={handleRemoveItem}
                    formatCurrency={formatCurrency}
                  />
                );
              })}
            </div>
          </Card>
        </Col>

        <Col xs={24} xl={8}>
          <div className="checkout-sidebar">
            <OrderSummary
              selectedItemsCount={selectedItems.size}
              selectedQuantity={getSelectedItemCount()}
              subtotal={subtotal}
              total={cartTotalPrice}
              onCheckout={handleCheckoutSelected}
              isDisabled={
                selectedItems.size === 0 ||
                isRemovingItem ||
                Object.values(isUpdatingItem).some(Boolean)
              }
              formatCurrency={formatCurrency}
            />

            <PromoCard />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
