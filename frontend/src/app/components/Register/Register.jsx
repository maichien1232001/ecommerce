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
          <h1>Create Account</h1>
          <p>Join thousands of customers who trust our platform</p>
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
            label="Full Name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your full name!",
              },
              {
                min: 2,
                message: "Name must be at least 2 characters long!",
              },
            ]}
          >
            <Input
              className="input-form"
              placeholder="Enter your full name"
              prefix={<UserOutlined />}
              size="large"
            />
          </Form.Item>

          <Form.Item
            className="form-item"
            name="email"
            label="Email Address"
            rules={[
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
              {
                required: true,
                message: "Please enter your email address!",
              },
            ]}
          >
            <Input
              className="input-form"
              placeholder="Enter your email address"
              prefix={<MailOutlined />}
              size="large"
            />
          </Form.Item>

          <Form.Item
            className="form-item"
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please create a password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input.Password
              className="input-form"
              placeholder="Create a strong password"
              prefix={<LockOutlined />}
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            className="form-item"
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              className="input-form"
              placeholder="Confirm your password"
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
              I agree to the{" "}
              <span className="link-terms">Terms of Service</span> and{" "}
              <span className="link-terms">Privacy Policy</span>
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
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </Form.Item>
        </Form>

        <div className="footer-register">
          <span>
            Already have an account?{" "}
            <span className="link-login" onClick={handleRedirect}>
              Sign in here
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
