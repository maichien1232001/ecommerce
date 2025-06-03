import React from "react";
import { Typography, Image } from "antd";

const { Text, Title } = Typography;

const ProductItem = ({ product, quantity, isSingle, formatCurrency }) => {
  return (
    <div
      className={`product-item ${
        isSingle ? "single-product" : "multiple-product"
      }`}
    >
      <div className="product-image-container">
        <Image
          src={product.images?.[0] || "https://via.placeholder.com/120"}
          alt={product.name}
          className="product-image"
          preview={false}
          fallback="https://via.placeholder.com/120"
        />
        {quantity > 1 && <div className="quantity-badge">{quantity}</div>}
      </div>

      <div className="product-info">
        <div className="product-main-info">
          <Title level={5} className="product-name" title={product.name}>
            {product.name}
          </Title>
          <Text className="product-brand">{product.brand}</Text>
        </div>

        <div className="product-pricing">
          <div className="price-info">
            <Text className="unit-price">{formatCurrency(product.price)}</Text>
            {quantity > 1 && (
              <Text className="quantity-text">× {quantity}</Text>
            )}
          </div>
          {quantity > 1 && (
            <Text className="subtotal">
              = {formatCurrency(product.price * quantity)}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
