import { Button, Card, Form, Input } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../redux/actions/user.actions";

const Password = (porps) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const loading = useSelector((state) => state.user.loading);
  const handleSubmit = async (values) => {
    await dispatch(changePassword(values));
    form.resetFields();
  };
  return (
    <div className="tab-content tab-password">
      <Card title="Thay đổi mật khẩu" className="info-card">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Mật khẩu hiện tại"
            name="oldPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu hiện tại" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu mới" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="submit-btn"
            >
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Password;
