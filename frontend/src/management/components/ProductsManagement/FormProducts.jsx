import { Button, Form, Input, InputNumber, Select } from "antd";
import React, { useState } from "react";
import CategorySelect from "../../../common/components/Select";
import UploadImg from "../../../common/components/Upload";
import ProductTypeSelect from "./ProductTypeSelect";
import SpecificationsFields from "./specificationsMap";

const { Item } = Form;
const { TextArea } = Input;

const FormProducts = (props) => {
  const {
    form,
    handleClose,
    selectedCategory,
    setSelectedCategory,
    fileList,
    setFileList,
    handleSubmit,
    isEdit,
    productType,
    setProductType,
  } = props;

  console.log(11111111, productType);

  return (
    <Form
      className="custom-form"
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={handleSubmit}
    >
      <Item
        label={"Tên"}
        name={"name"}
        rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
      >
        <Input allowClear />
      </Item>
      <Item
        label={"Mô tả"}
        name={"description"}
        rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm" }]}
      >
        <TextArea
          className="input-form input-form-textarea"
          rows={4}
          maxLength={500}
          allowClear
        />
      </Item>
      <Item
        label={"Giá"}
        name={"price"}
        rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
      >
        <InputNumber style={{ width: "100%" }} min={0} allowClear />
      </Item>
      <Item
        label={"Loại sản phẩm"}
        name={"category"}
        rules={[{ required: true, message: "Hãy chọn loại sản phẩm" }]}
      >
        <CategorySelect
          placeholder="Chọn loại sản phẩm"
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      </Item>
      <Item
        label={"Số lượng"}
        name={"stock"}
        rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
      >
        <InputNumber style={{ width: "100%" }} min={0} allowClear />
      </Item>
      <Item
        label={"Ảnh sản phẩm"}
        name={"images"}
        rules={[{ required: true, message: "Vui lòng thêm ít nhất 1 ảnh" }]}
      >
        <UploadImg fileList={fileList} setFileList={setFileList} form={form} />
      </Item>

      <ProductTypeSelect
        productType={productType}
        setProductType={setProductType}
      />

      {productType && <SpecificationsFields productType={productType} />}

      <Form.Item>
        {isEdit && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 24,
            }}
          >
            <Button onClick={handleClose}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              Thêm sản phẩm
            </Button>
          </div>
        )}
      </Form.Item>
    </Form>
  );
};

export default FormProducts;
