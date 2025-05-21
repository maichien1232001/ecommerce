import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import React, { useCallback, useState } from "react";
import "./ProductsManagement.scss";
import FormProducts from "./FormProducts";
import useImageUploadHandler from "../../../common/components/Upload/useImageUploadHandler";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/actions/product.action";
import ProductModal from "./ProductModal";

const AddProduct = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isOpenModalAddProduct, SetIsOpenAddProduct] = useState(false);
  const [fileList, setFileList] = useState([]);

  const { handleImageRemove } = useImageUploadHandler(
    fileList,
    setFileList,
    form
  );

  const handleSubmit = async (value) => {
    await dispatch(addProduct(value));
    SetIsOpenAddProduct(false);
    form.resetFields();
    setFileList([]);
  };

  const handleClose = useCallback(async () => {
    for (const file of fileList) {
      await handleImageRemove(file);
    }
    SetIsOpenAddProduct(false);
    form.resetFields();
  }, [fileList, handleImageRemove, form]);

  return (
    <>
      <Button type="primary" onClick={() => SetIsOpenAddProduct(true)}>
        <PlusOutlined />
        Thêm sản phẩm
      </Button>
      <ProductModal
        visible={isOpenModalAddProduct}
        onClose={handleClose}
        title="Thêm sản phẩm"
        isEdit={true}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddProduct;
