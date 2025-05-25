import React from "react";
import ProductModal from "../ProductModal";

const ViewProduct = (props) => {
  const { visible, onClose, product } = props;
  return (
    <ProductModal
      visible={visible}
      onClose={onClose}
      product={product}
      title="Chi tiết sản phẩm"
      isEdit={false}
    />
  );
};

export default ViewProduct;
