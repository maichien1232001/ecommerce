import React, { useMemo, useCallback, memo, useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Space,
  Button,
  Select,
} from "antd";
import dayjs from "dayjs";
import BillingAddressForm from "./BillingAddressForm";

const { Option } = Select;

const PaymentModal = ({
  isVisible,
  isEditing,
  editingPayment,
  onCancel,
  onSubmit,
  provinces,
  useLocationMapping,
}) => {
  const [form] = Form.useForm();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("VNPay");

  // Danh sách phương thức thanh toán
  const paymentMethods = [
    { value: "VNPay", label: "VNPay" },
    { value: "PayPal", label: "PayPal" },
    { value: "COD", label: "COD" },
  ];

  const title = useMemo(
    () =>
      isEditing
        ? "Chỉnh sửa phương thức thanh toán"
        : "Thêm phương thức thanh toán",
    [isEditing]
  );

  // Kiểm tra xem có cần hiển thị thông tin thẻ không
  const shouldShowCardInfo = useMemo(() => {
    return (
      selectedPaymentMethod === "VNPay" || selectedPaymentMethod === "PayPal"
    );
  }, [selectedPaymentMethod]);

  // Kiểm tra xem có cần địa chỉ cụ thể không
  const needsSpecificAddress = useMemo(() => {
    return (
      selectedPaymentMethod === "PayPal" || selectedPaymentMethod === "COD"
    );
  }, [selectedPaymentMethod]);

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

  // Xử lý thay đổi phương thức thanh toán
  const handlePaymentMethodChange = useCallback(
    (value) => {
      setSelectedPaymentMethod(value);

      // Reset các field không cần thiết khi thay đổi phương thức
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

  // Set form values when editing
  useEffect(() => {
    if (isVisible) {
      if (isEditing && editingPayment) {
        const paymentMethod = editingPayment.paymentMethod || "VNPay";
        setSelectedPaymentMethod(paymentMethod);

        form.setFieldsValue({
          ...editingPayment,
          paymentMethod: paymentMethod,
          expirationDate: editingPayment.expirationDate
            ? dayjs(editingPayment.expirationDate)
            : null,
          address: editingPayment.billingAddress?.address || "",
          province: editingPayment.billingAddress?.province || "",
          district: editingPayment.billingAddress?.district || "",
          ward: editingPayment.billingAddress?.ward || "",
          specificAddress: editingPayment.billingAddress?.specificAddress || "",
          postalCode: editingPayment.billingAddress?.postalCode || "",
        });
      } else {
        form.resetFields();
        setSelectedPaymentMethod("VNPay");
        form.setFieldsValue({ paymentMethod: "VNPay" });
      }
    }
  }, [isVisible, isEditing, editingPayment, form]);

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

  const needsPostalCode = useMemo(() => {
    return selectedPaymentMethod === "COD";
  }, [selectedPaymentMethod]);

  return (
    <Modal
      title={title}
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      width={800}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Phương thức thanh toán */}
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

        {/* Thông tin thẻ - chỉ hiển thị cho VNPay và PayPal */}
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

        {/* Địa chỉ cụ thể - chỉ hiển thị cho PayPal và COD */}
        {needsSpecificAddress && (
          <Row gutter={16}>
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

        <Form.Item className="modal-footer">
          <Space>
            <Button onClick={onCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(PaymentModal);
