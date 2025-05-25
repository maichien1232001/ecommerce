import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { register } from "../../../redux/actions/auth.actions";
import { useDispatch } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRedirect = () => {
    navigate("/login");
  };

  const onFinish = (values) => {
    const { username, email, password } = values;

    dispatch(register({ name: username, email, password }, navigate));
  };
  const onFinishFailed = (errorInfo) => {};

  return (
    <div className="container-register">
      <Form
        className="form-register"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className="form-item"
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input className="input-form" />
        </Form.Item>
        <Form.Item
          className="form-item"
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input className="input-form" />
        </Form.Item>

        <Form.Item
          className="form-item"
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password className="input-form" />
        </Form.Item>

        <Form.Item
          className="form-item remember"
          name="remember"
          valuePropName="checked"
          label={null}
        >
          <Checkbox>Nhớ mật khẩu</Checkbox>
        </Form.Item>

        <Form.Item className="btn-register" label={null}>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
      <div className="footer-register">
        <span>
          Nếu bạn đã có tài khoản, click vào{" "}
          <span className="link-login" onClick={() => handleRedirect()}>
            đây
          </span>{" "}
          để có thể đăng nhập
        </span>
      </div>
    </div>
  );
};
export default Register;
