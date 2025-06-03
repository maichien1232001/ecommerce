import React from "react";
import { Form, Input, Card, Typography, Divider, Tag } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import FormShippingAddress from "../../../common/components/Form/FormShippingAddress";
import _ from "lodash";

const { Title } = Typography;

const CustomerInfoCard = ({ onSubmit, loading, user, formShippingAddress }) => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values) => {
    onSubmit(values);
  };

  const { shippingAddresses } = user;
  const shippingAddressesDefault = _.find(
    shippingAddresses,
    (item) => item.isDefault
  );
  const getFullAddress = (address) => {
    const parts = [
      address.detailAddress,
      address.ward,
      address.district,
      address.province,
    ].filter(Boolean);
    return parts.join(", ");
  };
  return (
    <Card className="info-card customer-card">
      <div className="card-header">
        <div className="card-icon">
          <UserOutlined />
        </div>
        <div className="card-title-section">
          <Title level={4} className="card-title">
            Thông tin giao hàng
          </Title>
          <div className="card-subtitle">
            Nhập thông tin để chúng tôi có thể liên hệ và giao hàng
          </div>
        </div>
      </div>

      <Divider className="card-divider" />

      <Form
        form={form}
        layout="vertical"
        name="customer_info_form"
        onFinish={handleFormSubmit}
        className="customer-form"
        initialValues={{
          name: user?.name || "",
          email: user?.email || "",
          phone: user?.phone || "",
        }}
      >
        <div className="form-section">
          <div className="form-row">
            <Form.Item
              name="name"
              label="Họ và tên"
              rules={[
                { required: true, message: "Vui lòng nhập họ và tên!" },
                { min: 2, message: "Họ tên phải có ít nhất 2 ký tự!" },
              ]}
              className="form-item-modern"
            >
              <Input
                prefix={<UserOutlined className="input-icon" />}
                placeholder="Nguyễn Văn A"
                size="large"
                className="modern-input"
                disabled
              />
            </Form.Item>
          </div>

          <div className="form-row">
            <div className="form-col">
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
                className="form-item-modern"
              >
                <Input
                  prefix={<MailOutlined className="input-icon" />}
                  placeholder="email@example.com"
                  size="large"
                  className="modern-input"
                  disabled
                />
              </Form.Item>
            </div>
            <div className="form-col">
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  {
                    pattern: /^[0-9]{10,11}$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
                className="form-item-modern"
              >
                <Input
                  prefix={<PhoneOutlined className="input-icon" />}
                  placeholder="0987654321"
                  size="large"
                  className="modern-input"
                  disabled
                />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="address-section">
          <div className="section-header">
            <div className="section-icon">
              <EnvironmentOutlined />
            </div>
            <div className="section-title-area">
              <Title level={5} className="section-title">
                Địa chỉ nhận hàng
              </Title>
              <div className="section-subtitle">
                Địa chỉ để chúng tôi giao hàng cho bạn
              </div>
            </div>
          </div>

          <Divider className="section-divider" />
          {!_.isEmpty(shippingAddresses) ? (
            <>
              <Card
                key={shippingAddressesDefault?._id}
                className="address-card"
                style={{ marginBottom: 16 }}
                loading={loading}
              >
                <div className="address-content">
                  <div className="address-header">
                    <h4
                      style={{
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <HomeOutlined />
                      {shippingAddressesDefault.receiverName}
                      {shippingAddressesDefault.isDefault && (
                        <Tag color="blue" size="small">
                          Mặc định
                        </Tag>
                      )}
                    </h4>
                    <p style={{ margin: "4px 0", color: "#666" }}>
                      {shippingAddressesDefault.receiverPhone}
                    </p>
                  </div>
                  <div className="address-detail">
                    <p style={{ margin: 0, color: "#333" }}>
                      {getFullAddress(shippingAddressesDefault)}
                    </p>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <FormShippingAddress
              handleSubmit={onSubmit}
              hideDefaultCheckbox={true}
              loading={loading}
              form={formShippingAddress}
            />
          )}
        </div>
      </Form>
    </Card>
  );
};

export default CustomerInfoCard;
