import { Button, Form, Modal, Select } from "antd";
import React, { useState } from "react";
import { STATUS_CONFIG } from "../../../constants/order";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../../redux/actions/order.actions";

const { Item } = Form;
const { Option } = Select;

const ModalUpdateOrderStatus = ({ order, visible, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const onSubmit = () => {
    const selectedStatus = form.getFieldValue("status");
    const finalStatus = selectedStatus || order.status;
    const data = {
      orderId: order?._id,
      status: finalStatus,
    };
    dispatch(updateOrderStatus(data));
    handleClose();
  };

  return (
    <Modal
      title="Cập nhật trạng thái đơn hàng"
      open={visible}
      onCancel={handleClose}
      footer={null}
    >
      <Form
        form={form}
        onFinish={onSubmit}
        initialValues={{
          status: order?.status,
        }}
      >
        <Item
          name="status"
          rules={[{ required: true, message: "Vui lòng không bỏ trống!" }]}
        >
          <Select>
            {Object.entries(STATUS_CONFIG.order).map(([key, value]) => (
              <Option key={key} value={key}>
                <div style={{ color: value.color }}>{value.text}</div>
              </Option>
            ))}
          </Select>
        </Item>
        <Item>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
            }}
          >
            <Button onClick={() => handleClose()}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              Đồng ý
            </Button>
          </div>
        </Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdateOrderStatus;
