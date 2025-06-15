import React from "react";
import { Button, Form, Input, Modal } from "antd";

const { Item } = Form;
const { TextArea } = Input;

const ModalAction = (props) => {
  const { form, isOpenModal, onClose, onSubmit, title, value } = props;
  console.log(value);
  return (
    <Modal open={isOpenModal} onCancel={onClose} footer={null} title={title}>
      <Form form={form} onFinish={onSubmit}>
        <Item
          name={"name"}
          label={"Tên loại sản phẩm"}
          rules={[
            { required: true, message: "Vui lòng nhập tên loại sản phẩm" },
          ]}
          className="form-item"
          initialValue={value}
        >
          <TextArea
            style={{ resize: "none" }}
            rows={4}
            maxLength={50}
            allowClear
            count={50}
            showCount
          />
        </Item>
        <Item>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
            }}
          >
            <Button onClick={onClose}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              Đồng ý
            </Button>
          </div>
        </Item>
      </Form>
    </Modal>
  );
};

export default ModalAction;
