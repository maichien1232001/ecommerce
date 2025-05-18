import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CategorySelect from "../../../common/components/Select";
import UploadImg from "../../../common/components/Upload";

const { Item } = Form;

const AddProduct = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isOpenModalAddProduct, SetIsOpenAddProduct] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fileList, setFileList] = useState([]);

  const handleClose = () => {
    SetIsOpenAddProduct(false);
    form.resetFields();
  };
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
      >
        <Form form={form}>
          <Item
            label={"Tên"}
            name={"name"}
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Item>
          <Item
            label={"Mô tả"}
            name={"description"}
            rules={[
              { required: true, message: "Vui lòng nhập mô tả sản phẩm" },
            ]}
          >
            <TextArea
              rows={4}
              showCount
              maxLength={500}
              //   onChange={(e) => setValue(e.target.value)}
              style={{ height: 120, resize: "none" }}
              placeholder="Nhập mô tả sản phẩm"
              //   value={value}
            />
          </Item>
          <Item
            label={"Giá"}
            name={"price"}
            rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
          >
            <InputNumber placeholder="Nhập giá sản phẩm" min={0} />
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
            <InputNumber placeholder="Nhập số lượng sản phẩm" min={0} />
          </Item>
          <Item
            label={"Ảnh sản phẩm"}
            name={"images"}
            rules={[{ required: true, message: "Vui lòng thêm ít nhất 1 ảnh" }]}
          >
            <UploadImg
              fileList={fileList}
              setFileList={setFileList}
              form={form}
            />
          </Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddProduct;
