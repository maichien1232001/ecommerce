import { Button, Form, Input, InputNumber, Select } from "antd";
import React, { useState } from "react";
import UploadImg from "../../../common/components/Upload";
import ProductTypeSelect from "./ProductTypeSelect";
import SpecificationsFields from "./specificationsMap";
import { useSelector } from "react-redux";
import CommonSelect from "../../../common/components/Select";
import { optionTags, statusOptionsBase } from "../../../constants/products";

const { Item } = Form;
const { TextArea } = Input;

const FormProducts = (props) => {
  const { form, handleClose, handleSubmit, isEdit, state, setState } = props;
  const { allCategory } = useSelector((state) => state.category);
  const brand = useSelector((state) => state.brand.brand);
  const handleSetFileList = (list) => {
    setState((prev) => ({
      ...prev,
      fileList: list,
    }));
  };
  const handleSetProductType = (value) => {
    setState((prev) => ({
      ...prev,
      productType: value,
    }));
  };

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
          options={allCategory}
          value={state.selectedCategory}
          onChange={(cat) => setState({ ...state, selectedCategory: cat })}
          getValue={(item) => item._id}
          getLabel={(item) => item.name}
          labelInValue
          disabled={!isEdit}
          placeholder="Chọn loại sản phẩm"
        />
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
            message:
              state.fileList.length === 0 && "Vui lòng thêm ít nhất 1 ảnh",
          },
        ]}
      >
        <UploadImg
          fileList={state.fileList}
          setFileList={handleSetFileList}
          form={form}
          disabled={!isEdit}
        />
      </Item>

      <Item
        label={"Thương hiệu"}
        name={"brand"}
        rules={[{ required: true, message: "Hãy chọn thương hiệu" }]}
      >
        <CommonSelect
          options={brand}
          value={state.selectedBrand}
          onChange={(cat) => setState({ ...state, selectedBrand: cat })}
          getValue={(item) => item?._id}
          getLabel={(item) => item?.name}
          labelInValue
          disabled={!isEdit}
          placeholder="Chọn thương hiệu sản phẩm"
        />
      </Item>

      <Item
        label={"Trạng thái"}
        name={"status"}
        rules={[{ required: true, message: "Hãy chọn trạng thái" }]}
      >
        <CommonSelect
          options={statusOptionsBase}
          value={state.selectedStatus}
          onChange={(cat) => setState({ ...state, selectedStatus: cat })}
          getValue={(item) => item?.value}
          getLabel={(item) => item?.label}
          labelInValue
          disabled={!isEdit}
          placeholder="Chọn trạng thái sản phẩm"
        />
      </Item>

      <Item
        label={"Tags"}
        name={"specialTag"}
        rules={[{ required: true, message: "Hãy chọn tag" }]}
      >
        <CommonSelect
          options={optionTags}
          value={state.selectedTag}
          onChange={(cat) => setState({ ...state, selectedTag: cat })}
          getValue={(item) => item?.value}
          getLabel={(item) => item?.label}
          labelInValue
          disabled={!isEdit}
          placeholder="Chọn tag sản phẩm"
        />
      </Item>

      <ProductTypeSelect
        productType={state.productType}
        setProductType={handleSetProductType}
        disabled={!isEdit}
      />

      {state.productType && (
        <SpecificationsFields
          productType={state.productType}
          disabled={!isEdit}
        />
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
