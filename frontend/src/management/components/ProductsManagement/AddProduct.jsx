import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CategorySelect from "../../../common/components/Select";
import UploadImg from "../../../common/components/Upload";
import "./ProductsManagement.scss";

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
        <Form
          className="custom-form"
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={(values) => {
            console.log("Submit form values:", values);
            // TODO: Xử lý submit ở đây (dispatch hoặc gọi API)
            handleClose(); // Đóng modal sau submit thành công
          }}
        >
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
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Nhập giá sản phẩm"
              min={0}
            />
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
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Nhập số lượng sản phẩm"
              min={0}
            />
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
          <div style={{ paddingLeft: 10 }}>
            <label
              style={{ fontWeight: "bold", display: "block", marginBottom: 8 }}
            >
              Thông số kỹ thuật
            </label>
            <Item label="CPU" name={["specifications", "cpu"]}>
              <TextArea
                rows={2}
                showCount
                maxLength={200}
                //   onChange={(e) => setValue(e.target.value)}
                style={{ height: 100, resize: "none" }}
                placeholder="Nhập thông số CPU"
                //   value={value}
              />
            </Item>
            <Item label="RAM" name={["specifications", "ram"]}>
              <TextArea
                rows={2}
                showCount
                maxLength={200}
                //   onChange={(e) => setValue(e.target.value)}
                style={{ height: 100, resize: "none" }}
                placeholder="Nhập thông số RAM"
                //   value={value}
              />
            </Item>
            <Item label="Storage" name={["specifications", "storage"]}>
              <TextArea
                rows={2}
                showCount
                maxLength={200}
                //   onChange={(e) => setValue(e.target.value)}
                style={{ height: 100, resize: "none" }}
                placeholder="Nhập dung lượng lưu trữ"
                //   value={value}
              />
            </Item>
            <Item
              label="Màn hình"
              name={["specifications", "screen"]}
              rules={[]}
            >
              <TextArea
                rows={2}
                showCount
                maxLength={200}
                //   onChange={(e) => setValue(e.target.value)}
                style={{ height: 100, resize: "none" }}
                placeholder="Nhập kích thước màn hình"
                //   value={value}
              />
            </Item>
            <Item label="Pin" name={["specifications", "battery"]}>
              <TextArea
                rows={2}
                showCount
                maxLength={200}
                //   onChange={(e) => setValue(e.target.value)}
                style={{ height: 100, resize: "none" }}
                placeholder="Nhập dung lượng pin"
                //   value={value}
              />
            </Item>
            <Item
              label="Hệ điều hành"
              name={["specifications", "operatingSystem"]}
            >
              <TextArea
                rows={2}
                showCount
                maxLength={200}
                //   onChange={(e) => setValue(e.target.value)}
                style={{ height: 100, resize: "none" }}
                placeholder="Nhập hệ điều hành"
                //   value={value}
              />
            </Item>
            <Item label="Màu sắc" name={["specifications", "color"]}>
              <TextArea
                rows={2}
                showCount
                maxLength={200}
                //   onChange={(e) => setValue(e.target.value)}
                style={{ height: 100, resize: "none" }}
                placeholder="Nhập màu sắc"
                //   value={value}
              />
            </Item>
            <Item label="Trọng lượng" name={["specifications", "weight"]}>
              <TextArea
                rows={2}
                showCount
                maxLength={200}
                //   onChange={(e) => setValue(e.target.value)}
                style={{ height: 100, resize: "none" }}
                placeholder="Nhập trọng lượng"
                //   value={value}
              />
            </Item>
            <Item label="Kết nối" name={["specifications", "connectivity"]}>
              <TextArea
                rows={2}
                showCount
                maxLength={200}
                //   onChange={(e) => setValue(e.target.value)}
                style={{ height: 100, resize: "none" }}
                placeholder="Nhập kết nối"
                //   value={value}
              />
            </Item>
            <Item label="Khác" name={["specifications", "others"]}>
              <TextArea
                rows={2}
                showCount
                maxLength={200}
                //   onChange={(e) => setValue(e.target.value)}
                style={{ height: 100, resize: "none" }}
                placeholder="Tính năng khác"
                //   value={value}
              />
            </Item>
          </div>
          <Form.Item>
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
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddProduct;
