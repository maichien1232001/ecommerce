import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useSelector } from "react-redux";
import LocationSelect from "../LocationSelect/LocationSelect";

const FormShippingAddress = (props) => {
  const {
    handleSubmit,
    hideDefaultCheckbox,
    loading,
    mode,
    onCancel,
    isModal,
    form,
  } = props;
  const provinces = useSelector((state) => state.address.provinces);

  const { showProvinces, showDistricts, showWards } = LocationSelect({
    provinces,
    onProvinceChange: (value) => {
      form.setFieldsValue({ province: value, district: null, ward: null });
    },
    onDistrictChange: (value) => {
      form.setFieldsValue({ district: value, ward: null });
    },
    onWardChange: (value) => {
      form.setFieldsValue({ ward: value });
    },
  });
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        isDefault: false,
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Họ và tên người nhận"
            name="receiverName"
            rules={[
              { required: true, message: "Vui lòng nhập tên người nhận!" },
            ]}
          >
            <Input placeholder="Nhập tên người nhận" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Số điện thoại"
            name="receiverPhone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Tỉnh/Thành phố"
            name="province"
            rules={[
              { required: true, message: "Vui lòng chọn tỉnh/thành phố!" },
            ]}
          >
            {showProvinces}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Quận/Huyện"
            name="district"
            rules={[{ required: true, message: "Vui lòng chọn quận/huyện!" }]}
          >
            {showDistricts}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Phường/Xã"
            name="ward"
            rules={[{ required: true, message: "Vui lòng chọn phường/xã!" }]}
          >
            {showWards}
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Địa chỉ cụ thể"
        name="detailAddress"
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ cụ thể!" }]}
      >
        <Input.TextArea
          rows={3}
          style={{ resize: "none" }}
          placeholder="Nhập địa chỉ cụ thể (số nhà, tên đường...)"
        />
      </Form.Item>
      <Form.Item label="Mã bưu điện" name="postalCode">
        <Input placeholder="Nhập mã bưu điện (tùy chọn)" />
      </Form.Item>

      {/* Chỉ hiển thị checkbox isDefault nếu không bị ẩn */}
      {!hideDefaultCheckbox && (
        <Form.Item name="isDefault" valuePropName="checked">
          <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
        </Form.Item>
      )}
      {/* Chỉ hiển thị cho modal thêm địa chỉ thanh toán */}
      {isModal && (
        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {mode === "add" ? "Thêm địa chỉ" : "Cập nhật"}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default FormShippingAddress;
