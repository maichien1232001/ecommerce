// Register.jsx
import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { register } from "../../../redux/actions/auth.actions";
import { useDispatch } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleRedirect = () => {
    navigate("/login");
  };

  const onFinish = async (values) => {
    setLoading(true);
    const { username, email, password } = values;

    try {
      await dispatch(register({ name: username, email, password }, navigate));
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Registration failed:", errorInfo);
  };

  return (
    <div className="container-register">
      <div className="form-wrapper">
        <div className="register-header">
          <h1>Tạo tài khoản</h1>
          <p>
            Tham gia cùng hàng ngàn khách hàng tin tưởng nền tảng của chúng tôi
          </p>
        </div>

        <Form
          form={form}
          className="form-register"
          name="register"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            className="form-item"
            label="Tên đầy đủ"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đầy đủ của bạn!",
              },
              {
                min: 2,
                message: "Tên phải dài ít nhất 2 ký tự!",
              },
            ]}
          >
            <Input
              className="input-form"
              placeholder="Nhập tên đầy đủ của bạn"
              prefix={<UserOutlined />}
              size="large"
            />
          </Form.Item>

          <Form.Item
            className="form-item"
            name="email"
            label="Địa chỉ email"
            rules={[
              {
                type: "email",
                message: "Vui lòng nhập địa chỉ email hợp lệ!",
              },
              {
                required: true,
                message: "Vui lòng nhập địa chỉ email của bạn!",
              },
            ]}
          >
            <Input
              className="input-form"
              placeholder="Nhập địa chỉ email của bạn"
              prefix={<MailOutlined />}
              size="large"
            />
          </Form.Item>

          <Form.Item
            className="form-item"
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng tạo mật khẩu!",
              },
              {
                min: 6,
                message: "Mật khẩu phải dài ít nhất 6 ký tự!",
              },
            ]}
          >
            <Input.Password
              className="input-form"
              placeholder="Tạo mật khẩu mạnh"
              prefix={<LockOutlined />}
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            className="form-item"
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu của bạn!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password
              className="input-form"
              placeholder="Xác nhận mật khẩu của bạn"
              prefix={<LockOutlined />}
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            className="form-item remember"
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>
              Tôi đồng ý với{" "}
              <span className="link-terms">Điều khoản dịch vụ</span> và{" "}
              <span className="link-terms">Chính sách bảo mật</span>
            </Checkbox>
          </Form.Item>

          <Form.Item className="btn-register">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
              size="large"
              block
            >
              {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
            </Button>
          </Form.Item>
        </Form>

        <div className="footer-register">
          <span>
            Đã có tài khoản?{" "}
            <span className="link-login" onClick={handleRedirect}>
              Đăng nhập tại đây
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
