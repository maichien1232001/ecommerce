import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import "./Login.scss";
import {useNavigate} from "react-router-dom";
import {login} from "../../../redux/actions/auth.actions";
import {useDispatch, useSelector} from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auths.loading);

  const handleRedirect = () => {
    navigate("/register");
  };

  const onFinish = (values) => {
    const {email, password} = values;
    dispatch(login({email, password}, navigate));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container-login">
      <Form
        className="form-login"
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

        <Form.Item className="btn-login" label={null}>
          <Button loading={loading} type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      <div className="footer-login">
        <span>
          Nếu bạn đã có tài khoản, click vào{" "}
          <span className="link-login" onClick={() => handleRedirect()}>
            đây
          </span>{" "}
          để có thể đăng ký
        </span>
      </div>
    </div>
  );
};
export default Login;
