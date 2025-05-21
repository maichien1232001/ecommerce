import React from "react";
import ProductModal from "./ProductModal";
import { useDispatch } from "react-redux";
import { editProduct } from "../../../redux/actions/product.action";

const EditProduct = (props) => {
  const { visible, onClose, product } = props;
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    await dispatch(editProduct(product._id, { id: product._id, ...values }));
    onClose();
  };

  return (
    <ProductModal
      visible={visible}
      onClose={onClose}
      product={product}
      title="Sửa sản phẩm"
      isEdit={true}
      onSubmit={handleSubmit}
    />
  );
};

export default EditProduct;
