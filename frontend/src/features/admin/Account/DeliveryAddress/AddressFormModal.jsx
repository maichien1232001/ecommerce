import React from "react";
import { Modal, Form, Input, Button, Row, Col, Checkbox } from "antd";
import LocationSelect from "../../../../common/components/LocationSelect/LocationSelect";

const AddressFormModal = ({
  visible,
  mode,
  form,
  provinces,
  onCancel,
  onSubmit,
  selectedAddress,
  hideDefaultCheckbox = false,
  loading = false,
}) => {
  const handleSubmit = (values) => {
    onSubmit(values, mode);
  };

  const { showProvinces, showDistricts, showWards } = LocationSelect({
    provinces,
    defaultValues: selectedAddress || {},
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
    <Modal
      title={mode === "add" ? "Thêm địa chỉ giao hàng" : "Chỉnh sửa địa chỉ"}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      destroyOnClose
    >
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

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {mode === "add" ? "Thêm địa chỉ" : "Cập nhật"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddressFormModal;
