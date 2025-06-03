import React, { useMemo, memo, useEffect, useState } from "react";
import { Modal, Form } from "antd";
import dayjs from "dayjs";
import FormPaymentInfo from "../../../../common/components/Form/FormPaymentInfo";

const PaymentModal = ({
  isVisible,
  isEditing,
  editingPayment,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("VNPay");

  const title = useMemo(
    () =>
      isEditing
        ? "Chỉnh sửa phương thức thanh toán"
        : "Thêm phương thức thanh toán",
    [isEditing]
  );

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

  return (
    <Modal
      title={title}
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      width={800}
      destroyOnClose
    >
      <FormPaymentInfo
        onSubmit={onSubmit}
        isEditing={isEditing}
        selectedPaymentMethod={selectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
        editingPayment={editingPayment}
        onCancel={onCancel}
        isModal={true}
        form={form}
      />
    </Modal>
  );
};

export default memo(PaymentModal);
