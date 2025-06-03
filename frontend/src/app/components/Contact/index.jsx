import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Space,
  message,
  Divider,
} from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  SendOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import "./Contact.scss";

const { Title, Text } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      message.success(
        "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24h."
      );
      form.resetFields();
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <PhoneOutlined className="contact-icon" />,
      title: "Điện thoại",
      content: "+84 (24) 3999 8888",
      subtitle: "Hotline hỗ trợ 24/7",
    },
    {
      icon: <MailOutlined className="contact-icon" />,
      title: "Email",
      content: "support@ecommerce.vn",
      subtitle: "Phản hồi trong 2-4 giờ",
    },
    {
      icon: <EnvironmentOutlined className="contact-icon" />,
      title: "Địa chỉ",
      content: "123 Đường ABC, Quận XYZ, TP.Hà Nội",
      subtitle: "Văn phòng chính",
    },
    {
      icon: <ClockCircleOutlined className="contact-icon" />,
      title: "Giờ làm việc",
      content: "T2 - T7: 8:00 - 18:00",
      subtitle: "Chủ nhật: 9:00 - 17:00",
    },
  ];

  return (
    <div className="contact-container">
      <div className="contact-header">
        <Title level={1} className="contact-title">
          Liên Hệ Với Chúng Tôi
        </Title>
        <Text className="contact-subtitle">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn! Hãy liên hệ với chúng tôi qua các
          kênh dưới đây hoặc gửi tin nhắn trực tiếp và chúng tôi sẽ phản hồi sớm
          nhất có thể.
        </Text>
      </div>

      <Row gutter={[24, 24]} style={{ marginBottom: "50px" }}>
        {contactInfo.map((item, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="contact-info-card">
              <div className="contact-info-item">
                {item.icon}
                <Title level={4} className="contact-info-title">
                  {item.title}
                </Title>
                <Text className="contact-info-content">{item.content}</Text>
                <Text className="contact-info-subtitle">{item.subtitle}</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={14}>
          <Card className="contact-form-card">
            <Title level={2} className="form-title">
              Gửi Tin Nhắn Cho Chúng Tôi
            </Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    rules={[
                      { required: true, message: "Vui lòng nhập họ tên!" },
                      { min: 2, message: "Họ tên phải có ít nhất 2 ký tự!" },
                    ]}
                  >
                    <Input placeholder="Nhập họ và tên của bạn" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Vui lòng nhập email!" },
                      { type: "email", message: "Email không hợp lệ!" },
                    ]}
                  >
                    <Input placeholder="your.email@example.com" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại!",
                      },
                      {
                        pattern: /^[0-9]{10,11}$/,
                        message: "Số điện thoại không hợp lệ!",
                      },
                    ]}
                  >
                    <Input placeholder="0123 456 789" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Chủ đề"
                    name="subject"
                    rules={[
                      { required: true, message: "Vui lòng nhập chủ đề!" },
                    ]}
                  >
                    <Input placeholder="Chủ đề tin nhắn" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Nội dung tin nhắn"
                name="message"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập nội dung tin nhắn!",
                  },
                  { min: 10, message: "Nội dung phải có ít nhất 10 ký tự!" },
                ]}
              >
                <TextArea
                  rows={6}
                  style={{ resize: "none" }}
                  placeholder="Hãy mô tả chi tiết yêu cầu hoặc câu hỏi của bạn..."
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="submit-btn"
                  icon={<SendOutlined />}
                >
                  {loading ? "Đang gửi..." : "Gửi tin nhắn"}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <div className="support-section">
            <CustomerServiceOutlined className="support-icon" />
            <Title level={3} className="support-title">
              Hỗ Trợ Khách Hàng 24/7
            </Title>
            <Text className="support-text">
              Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ bạn
              mọi lúc, mọi nơi. Chúng tôi cam kết phản hồi nhanh chóng và giải
              quyết mọi thắc mắc của bạn một cách tốt nhất.
            </Text>

            <Divider className="contact-divider" />

            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div>
                <Title
                  level={4}
                  style={{ color: "#1890ff", marginBottom: "8px" }}
                >
                  Chính Sách Bảo Hành
                </Title>
                <Text style={{ color: "#666" }}>
                  Bảo hành chính hãng, đổi trả trong 30 ngày
                </Text>
              </div>

              <div>
                <Title
                  level={4}
                  style={{ color: "#1890ff", marginBottom: "8px" }}
                >
                  Giao Hàng Nhanh
                </Title>
                <Text style={{ color: "#666" }}>
                  Giao hàng miễn phí trong 2-4 giờ tại TP.HCM
                </Text>
              </div>

              <div>
                <Title
                  level={4}
                  style={{ color: "#1890ff", marginBottom: "8px" }}
                >
                  Thanh Toán Linh Hoạt
                </Title>
                <Text style={{ color: "#666" }}>
                  Hỗ trợ đa dạng phương thức thanh toán
                </Text>
              </div>
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
