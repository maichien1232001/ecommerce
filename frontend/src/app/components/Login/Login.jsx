import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { login } from "../../../redux/actions/auth.actions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auths.loading);

  const handleRedirect = () => {
    navigate("/register");
  };

  const onFinish = (values) => {
    const { email, password } = values;
    dispatch(login({ email, password }, navigate));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container-login">
      <div className="form-wrapper">
        <div className="login-header">
          <h1>Chào mừng trở lại</h1>
          <p>Đăng nhập vào tài khoản của bạn để tiếp tục mua sắm</p>
        </div>

        <Form
          className="form-login"
          name="login"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className="form-item"
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "Vui lòng nhập đúng định dạng email!",
              },
              {
                required: true,
                message: "Vui lòng nhập email của bạn!",
              },
            ]}
          >
            <Input
              className="input-form"
              prefix={<UserOutlined />}
              placeholder="Nhập email của bạn"
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
                message: "Vui lòng nhập mật khẩu!",
              },
              {
                min: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự!",
              },
            ]}
          >
            <Input.Password
              className="input-form"
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu của bạn"
              size="large"
            />
          </Form.Item>

          <div className="forgot-password">
            <a href="/forgot-password">Quên mật khẩu?</a>
          </div>

          <Form.Item
            className="form-item remember"
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
          </Form.Item>

          <Form.Item className="btn-login">
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </Form.Item>
        </Form>

        <div className="footer-login">
          <span>
            Chưa có tài khoản?{" "}
            <span className="link-login" onClick={handleRedirect}>
              Đăng ký ngay
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
