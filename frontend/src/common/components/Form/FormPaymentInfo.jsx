import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import BillingAddressForm from "../../../features/admin/Account/PaymentMethod/BillingAddressForm";
import { useLocationMapping } from "../../../hooks/useLocationMapping";

const { Option } = Select;

const FormPaymentInfo = (props) => {
  const {
    onSubmit,
    isEditing,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    onCancel,
    isModal,
    editingPayment,
    form,
  } = props;

  const provinces = useSelector((state) => state.address.provinces);

  const paymentMethods = [
    { value: "VNPay", label: "VNPay" },
    { value: "PayPal", label: "PayPal" },
    { value: "COD", label: "COD" },
  ];

  const shouldShowCardInfo = useMemo(() => {
    return (
      selectedPaymentMethod === "VNPay" || selectedPaymentMethod === "PayPal"
    );
  }, [selectedPaymentMethod]);

  const needsSpecificAddress = useMemo(() => {
    return (
      selectedPaymentMethod === "PayPal" || selectedPaymentMethod === "COD"
    );
  }, [selectedPaymentMethod]);

  const needsPostalCode = useMemo(() => {
    return selectedPaymentMethod === "COD";
  }, [selectedPaymentMethod]);

  const initialBillingValues = useMemo(() => {
    if (isEditing && editingPayment?.billingAddress) {
      return {
        province: editingPayment.billingAddress.province,
        district: editingPayment.billingAddress.district,
        ward: editingPayment.billingAddress.ward,
      };
    }
    return null;
  }, [isEditing, editingPayment]);

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const formattedValues = {
          ...values,
          paymentMethod: values.paymentMethod,
          expirationDate:
            values.expirationDate && shouldShowCardInfo
              ? values.expirationDate.toDate()
              : null,
          billingAddress: {
            address: values.address || "",
            province: values.province || "",
            district: values.district || "",
            ward: values.ward || "",
            specificAddress: values.specificAddress || "",
            postalCode: values.postalCode || "",
          },
        };
        console.log("formattedValues", formattedValues);
        await onSubmit(formattedValues);
      } catch (error) {
        console.error("Submit error:", error);
      }
    },
    [onSubmit, shouldShowCardInfo, needsSpecificAddress]
  );
  const handlePaymentMethodChange = useCallback(
    (value) => {
      setSelectedPaymentMethod(value);
      if (value === "COD") {
        form.setFieldsValue({
          cardNumber: undefined,
          cardHolderName: undefined,
          expirationDate: undefined,
          cvv: undefined,
        });
      }
    },
    [form]
  );

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Phương thức thanh toán"
            name="paymentMethod"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn phương thức thanh toán!",
              },
            ]}
          >
            <Select
              placeholder="Chọn phương thức thanh toán"
              onChange={handlePaymentMethodChange}
            >
              {paymentMethods.map((method) => (
                <Option key={method.value} value={method.value}>
                  {method.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {shouldShowCardInfo && (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Số thẻ"
                name="cardNumber"
                rules={[
                  { required: true, message: "Vui lòng nhập số thẻ!" },
                  {
                    pattern: /^\d{16}$/,
                    message: "Số thẻ phải có 16 chữ số!",
                  },
                ]}
              >
                <Input
                  placeholder="1234567890123456"
                  maxLength={16}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    form.setFieldValue("cardNumber", value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tên chủ thẻ"
                name="cardHolderName"
                rules={[
                  { required: true, message: "Vui lòng nhập tên chủ thẻ!" },
                ]}
              >
                <Input
                  placeholder="NGUYEN VAN A"
                  style={{ textTransform: "uppercase" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ngày hết hạn"
                name="expirationDate"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày hết hạn!" },
                ]}
              >
                <DatePicker
                  picker="month"
                  format="MM/YYYY"
                  placeholder="MM/YYYY"
                  style={{ width: "100%" }}
                  disabledDate={(current) =>
                    current && current < dayjs().endOf("month")
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="CVV"
                name="cvv"
                rules={[
                  { required: true, message: "Vui lòng nhập CVV!" },
                  {
                    pattern: /^\d{3,4}$/,
                    message: "CVV phải có 3-4 chữ số!",
                  },
                ]}
              >
                <Input
                  placeholder="123"
                  maxLength={4}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    form.setFieldValue("cvv", value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}

      <div style={{ marginTop: 16, marginBottom: 16 }}>
        <h4>Địa chỉ thanh toán</h4>
      </div>

      <Row gutter={16}>
        <BillingAddressForm
          form={form}
          provinces={provinces}
          useLocationMapping={useLocationMapping}
          initialValues={initialBillingValues}
        />
      </Row>

      {needsSpecificAddress && (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tên người nhận"
              name="cardHolderName"
              rules={[
                { required: true, message: "Vui lòng nhập tên người nhận!" },
              ]}
            >
              <Input placeholder="NGUYEN VAN A" />
            </Form.Item>
          </Col>
          <Col span={needsPostalCode ? 16 : 24}>
            <Form.Item
              label="Địa chỉ cụ thể"
              name="specificAddress"
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ cụ thể!" },
              ]}
            >
              <Input.TextArea
                placeholder="Nhập địa chỉ cụ thể (số nhà, tên đường...)"
                rows={3}
              />
            </Form.Item>
          </Col>
          {needsPostalCode && (
            <Col span={8}>
              <Form.Item
                label="Mã bưu điện"
                name="postalCode"
                rules={[
                  { required: true, message: "Vui lòng nhập mã bưu điện!" },
                  {
                    pattern: /^\d{5,6}$/,
                    message: "Mã bưu điện phải có 5-6 chữ số!",
                  },
                ]}
              >
                <Input
                  placeholder="12345"
                  maxLength={6}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    form.setFieldValue("postalCode", value);
                  }}
                />
              </Form.Item>
            </Col>
          )}
        </Row>
      )}
      {isModal && (
        <Form.Item className="modal-footer">
          <Space>
            <Button onClick={onCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};

export default FormPaymentInfo;
