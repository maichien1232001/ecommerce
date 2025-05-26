import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import {
  MailOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "./ForgotPassword.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const loading = useSelector((state) => state.auths.loading);

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const onFinish = async (values) => {
    const { email } = values;
    setUserEmail(email);

    try {
      // dispatch(forgotPassword(email));
      setTimeout(() => {
        setIsEmailSent(true);
        message.success("Email khôi phục mật khẩu đã được gửi!");
      }, 1500);
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleResendEmail = () => {
    message.info("Email đã được gửi lại!");
  };

  if (isEmailSent) {
    return (
      <div className="container-forgot-password">
        <div className="form-wrapper">
          <div className="success-icon">
            <CheckCircleOutlined />
          </div>

          <div className="forgot-header">
            <h1>Kiểm tra email của bạn</h1>
            <p>
              Chúng tôi đã gửi liên kết khôi phục mật khẩu đến
              <br />
              <strong>{userEmail}</strong>
            </p>
          </div>

          <div className="email-instructions">
            <div className="instruction-item">
              <span className="step">1</span>
              <span>Kiểm tra hộp thư đến của bạn</span>
            </div>
            <div className="instruction-item">
              <span className="step">2</span>
              <span>Nhấp vào liên kết trong email</span>
            </div>
            <div className="instruction-item">
              <span className="step">3</span>
              <span>Tạo mật khẩu mới</span>
            </div>
          </div>

          <div className="action-buttons">
            <Button
              type="primary"
              size="large"
              block
              onClick={handleBackToLogin}
              className="back-login-btn"
            >
              Quay lại đăng nhập
            </Button>

            <Button
              type="text"
              size="large"
              block
              onClick={handleResendEmail}
              className="resend-btn"
            >
              Gửi lại email
            </Button>
          </div>

          <div className="footer-help">
            <p>
              Không nhận được email? Kiểm tra thư mục spam hoặc{" "}
              <a href="/contact">liên hệ hỗ trợ</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-forgot-password">
      <div className="form-wrapper">
        <button className="back-button" onClick={handleBackToLogin}>
          <ArrowLeftOutlined />
        </button>

        <div className="forgot-header">
          <h1>Quên mật khẩu?</h1>
          <p>
            Đừng lo lắng! Nhập email của bạn và chúng tôi sẽ gửi liên kết để đặt
            lại mật khẩu.
          </p>
        </div>

        <Form
          className="form-forgot-password"
          name="forgotPassword"
          layout="vertical"
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
              prefix={<MailOutlined />}
              placeholder="Nhập email đã đăng ký"
              size="large"
            />
          </Form.Item>

          <Form.Item className="btn-submit">
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              {loading ? "Đang gửi..." : "Gửi liên kết khôi phục"}
            </Button>
          </Form.Item>
        </Form>

        <div className="divider">
          <span>hoặc</span>
        </div>

        <div className="alternative-options">
          <Button
            type="default"
            size="large"
            block
            onClick={handleBackToLogin}
            className="back-login-btn"
          >
            Quay lại đăng nhập
          </Button>
        </div>

        <div className="footer-help">
          <p>
            Cần trợ giúp? <a href="/contact">Liên hệ hỗ trợ khách hàng</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
