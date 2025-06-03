import React, { memo } from "react";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card } from "antd";
import Paragraph from "antd/es/skeleton/Paragraph";
import Title from "antd/es/skeleton/Title";

const LoginRequired = memo(() => (
  <div className="login-required">
    <Card className="login-card">
      <div className="avatar-container">
        <Avatar size={80} icon={<UserOutlined />} />
      </div>
      <Title level={3}>Vui lòng đăng nhập</Title>
      <Paragraph type="secondary">
        Bạn cần đăng nhập để xem lịch sử đơn hàng và theo dõi trạng thái giao
        hàng của mình.
      </Paragraph>
      <Button
        type="primary"
        size="large"
        icon={<LoginOutlined />}
        className="login-button"
      >
        Đăng nhập ngay
      </Button>
    </Card>
  </div>
));

export default LoginRequired;
