import { Image } from "antd";
import React, { memo } from "react";

const ProductItem = memo(({ product, showFullDetails = false }) => {
  const imageSize = showFullDetails ? 80 : 48;
  return (
    <div className={`product-item ${showFullDetails ? "detailed" : ""}`}>
      <Image
        src={product?.product?.images[0]}
        alt={product.product.name}
        width={imageSize}
        height={imageSize}
        style={{ borderRadius: "6px" }}
      />
      <div className="product-details">
        <div className="product-name">{product.product.name}</div>
        <div className="product-price">
          SL: {product.quantity} × {(product.price / 1000000).toFixed(1)}M ₫
        </div>
        {showFullDetails && (
          <div className="product-total">
            Thành tiền:{" "}
            {((product.price * product.quantity) / 1000000).toFixed(1)}M ₫
          </div>
        )}
      </div>
    </div>
  );
});

export default ProductItem;
