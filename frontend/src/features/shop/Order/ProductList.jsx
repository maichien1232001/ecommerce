import React from "react";
import ProductItem from "./ProductItem";
import { Tag } from "antd";

const ProductList = React.memo(({ products, maxDisplay = 2 }) => (
  <div className="product-list">
    {products.slice(0, maxDisplay).map((product, index) => (
      <ProductItem key={`${product.product._id}-${index}`} product={product} />
    ))}
    {products.length > maxDisplay && (
      <div className="more-products">
        <Tag color="geekblue">
          +{products.length - maxDisplay} sản phẩm khác
        </Tag>
      </div>
    )}
  </div>
));

export default ProductList;
