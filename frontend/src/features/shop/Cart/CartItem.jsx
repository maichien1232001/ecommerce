import React from "react";
import {
  Card,
  Checkbox,
  Typography,
  Badge,
  Button,
  Space,
  Tooltip,
  Rate,
} from "antd";
import {
  HeartOutlined,
  CheckCircleOutlined,
  ThunderboltOutlined,
  DeleteOutlined,
  FireOutlined,
} from "@ant-design/icons";
import QuantityControls from "./QuantityControls";

const { Title, Text } = Typography;

const CartItem = ({
  item,
  isSelected,
  currentQuantity,
  hasQuantityChanged,
  isUpdating,
  isRemoving,
  onSelect,
  onQuantityChange,
  onUpdate,
  onCheckoutSingle,
  onRemove,
  formatCurrency,
}) => {
  const itemTotal = currentQuantity * item.productId.price;

  return (
    <Card
      key={item._id}
      className={`modern-cart-item ${isSelected ? "selected" : ""}`}
    >
      <div className="item-selection-image">
        <div className="item-selection">
          <Checkbox
            checked={isSelected}
            onChange={(e) => onSelect(item.productId._id, e.target.checked)}
            className="item-checkbox"
          />
        </div>

        <div className="item-image-section">
          <div className="product-image-wrapper">
            <img
              src={
                item.productId.images && item.productId.images.length > 0
                  ? item.productId.images[0]
                  : "https://via.placeholder.com/200x200"
              }
              alt={item.productId.name}
              className="product-image"
            />
            <div className="image-overlay">
              <Button
                icon={<HeartOutlined />}
                shape="circle"
                className="favorite-btn"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="item-details-section">
        <div className="product-info">
          <Title level={4} className="product-name">
            {item.productId.name}
          </Title>

          <div className="product-meta">
            <Text className="product-sku">
              SKU: #{item.productId._id.slice(-6)}
            </Text>
            <Badge
              status="success"
              text={`Còn ${item.productId.stock} sản phẩm`}
            />
          </div>

          <div className="price-section">
            <Text className="current-price">
              {formatCurrency(item.productId.price)}
            </Text>
            <Text className="original-price" delete>
              {formatCurrency(item.productId.price * 1.2)}
            </Text>
            <Badge count="20%" className="discount-badge" />
          </div>
        </div>

        <QuantityControls
          quantity={currentQuantity}
          maxStock={item.productId.stock}
          onQuantityChange={(value) =>
            onQuantityChange(item.productId._id, value)
          }
          isDisabled={isRemoving || isUpdating}
        />

        <div className="item-total">
          <Text className="total-label">Tổng cộng:</Text>
          <Text strong className="total-price">
            {formatCurrency(itemTotal)}
          </Text>
        </div>
      </div>

      <div className="item-actions-section">
        <div className="action-buttons">
          {hasQuantityChanged && (
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => onUpdate(item.productId._id)}
              loading={isUpdating}
              disabled={isRemoving}
              className="update-btn"
              size="small"
            >
              Cập nhật
            </Button>
          )}

          <Button
            type="primary"
            icon={<ThunderboltOutlined />}
            onClick={() => onCheckoutSingle(item.productId)}
            className="buy-now-btn"
            disabled={isRemoving || isUpdating}
            size="small"
          >
            Mua ngay
          </Button>

          <Space>
            <Tooltip title="Thêm vào yêu thích">
              <Button
                icon={<HeartOutlined />}
                shape="circle"
                className="wishlist-btn"
                size="small"
              />
            </Tooltip>

            <Tooltip title="Xóa khỏi giỏ hàng">
              <Button
                danger
                icon={<DeleteOutlined />}
                shape="circle"
                onClick={() => onRemove(item.productId._id)}
                loading={isRemoving}
                disabled={isUpdating}
                className="delete-btn"
                size="small"
              />
            </Tooltip>
          </Space>
        </div>

        {/* Add product rating */}
        <div className="product-rating">
          <div className="rating-stars">
            <Rate disabled defaultValue={4.5} allowHalf />
          </div>
          <Text className="rating-text">4.5/5 (128 đánh giá)</Text>
        </div>

        {/* Add stock indicator */}
        <div className="stock-indicator">
          <div className="stock-dot"></div>
          <Text className="stock-text">
            {item.productId.stock > 10 ? "Còn hàng" : "Sắp hết"}
          </Text>
        </div>

        {/* Add hot item indicator if applicable */}
        {item.productId.stock < 5 && (
          <Tooltip title="Sản phẩm hot - Số lượng có hạn!">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                padding: "4px 8px",
                background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                border: "1px solid #fca5a5",
                borderRadius: "6px",
                marginTop: "4px",
              }}
            >
              <FireOutlined style={{ color: "#dc2626", fontSize: "12px" }} />
              <Text
                style={{ fontSize: "10px", color: "#dc2626", fontWeight: 600 }}
              >
                HOT
              </Text>
            </div>
          </Tooltip>
        )}
      </div>
    </Card>
  );
};

export default CartItem;
