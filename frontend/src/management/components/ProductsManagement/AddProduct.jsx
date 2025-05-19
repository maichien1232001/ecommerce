import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import React, { useCallback, useState } from "react";
import "./ProductsManagement.scss";
import FormProducts from "./FormProducts";
import useImageUploadHandler from "../../../common/components/Upload/useImageUploadHandler";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/actions/product.action";

const AddProduct = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isOpenModalAddProduct, SetIsOpenAddProduct] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [productType, setProductType] = useState();

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
      <Modal
        title={"Thêm sản phẩm"}
        open={isOpenModalAddProduct}
        onCancel={() => handleClose()}
        footer={null}
        width={800}
      >
        <FormProducts
          form={form}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          fileList={fileList}
          setFileList={setFileList}
          isEdit={true}
          productType={productType} // truyền vào để dùng trong form
          setProductType={setProductType}
        />
      </Modal>
    </>
  );
};

export default AddProduct;
