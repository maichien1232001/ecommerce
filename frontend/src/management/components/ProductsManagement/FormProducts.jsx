import { Button, Form, Input, InputNumber, Select } from "antd";
import React, { useState } from "react";
import CategorySelect from "../../../common/components/Select";
import UploadImg from "../../../common/components/Upload";
import ProductTypeSelect from "./ProductTypeSelect";
import SpecificationsFields from "./specificationsMap";
import { useSelector } from "react-redux";
import CommonSelect from "../../../common/components/Select";

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
  const categories = useSelector((state) => state.category.category);
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
        <Input allowClear disabled={!isEdit} />
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
          disabled={!isEdit}
        />
      </Item>

      <Item
        label={"Giá"}
        name={"price"}
        rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          allowClear
          disabled={!isEdit}
        />
      </Item>

      <Item
        label={"Loại sản phẩm"}
        name={"category"}
        rules={[{ required: true, message: "Hãy chọn loại sản phẩm" }]}
      >
        <CommonSelect
          options={categories}
          value={selectedCategory}
          onChange={(cat) => setSelectedCategory(cat)} // trả về object đầy đủ
          getValue={(item) => item._id}
          getLabel={(item) => item.name}
          labelInValue
          disabled={!isEdit}
          placeholder="Chọn loại sản phẩm"
        />
        {/* <CategorySelect
          value={selectedCategory}
          onChange={setSelectedCategory}
          disabled={!isEdit}
        /> */}
      </Item>

      <Item
        label={"Số lượng"}
        name={"stock"}
        rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          allowClear
          disabled={!isEdit}
        />
      </Item>

      <Item
        label={"Ảnh sản phẩm"}
        name={"images"}
        rules={[
          {
            required: true,
            message: fileList.length === 0 && "Vui lòng thêm ít nhất 1 ảnh",
          },
        ]}
      >
        <UploadImg
          fileList={fileList}
          setFileList={setFileList}
          form={form}
          disabled={!isEdit}
        />
      </Item>

      <ProductTypeSelect
        productType={productType}
        setProductType={setProductType}
        disabled={!isEdit}
      />

      {productType && (
        <SpecificationsFields productType={productType} disabled={!isEdit} />
      )}

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
              Lưu
            </Button>
          </div>
        )}
      </Form.Item>
    </Form>
  );
};

export default FormProducts;
