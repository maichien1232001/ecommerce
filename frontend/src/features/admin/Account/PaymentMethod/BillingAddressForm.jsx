import React from "react";
import { Modal, Form, Input, Button, Row, Col, Checkbox } from "antd";
import LocationSelect from "../../../../common/components/LocationSelect/LocationSelect";

const BillingAddressForm = ({
  visible,
  mode,
  form,
  provinces,
  onCancel,
  onSubmit,
  selectedAddress,
}) => {
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
    <>
      <Col span={8}>
        <Form.Item
          label="Tỉnh/Thành phố"
          name="province"
          rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố!" }]}
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
    </>
  );
};

export default BillingAddressForm;
