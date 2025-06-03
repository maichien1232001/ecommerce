import React, { memo } from "react";
import { Card, Divider } from "antd";
import ProductItem from "./ProductItem";
import { formatCurrency } from "../../../constants/common";

const DetailedProductList = memo(({ products, totalAmount }) => (
  <Card title="Danh sách sản phẩm" style={{ marginBottom: "16px" }}>
    <div className="modal-product-list">
      {products.map((product, index) => (
        <div
          key={`${product.product._id}-${index}`}
          style={{ marginBottom: "12px" }}
        >
          <ProductItem product={product} showFullDetails={true} />
          {index < products.length - 1 && (
            <Divider style={{ margin: "12px 0" }} />
          )}
        </div>
      ))}
    </div>

    <Divider />

    <div style={{ textAlign: "right" }}>
      <div style={{ fontSize: "18px", fontWeight: "bold", color: "#1890ff" }}>
        Tổng cộng: {formatCurrency(totalAmount)}
      </div>
    </div>
  </Card>
));

export default DetailedProductList;
