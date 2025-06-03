import React, { useState, useMemo, useCallback } from "react";
import { Row, Col, Card, Button, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import EmptyPaymentState from "./EmptyPaymentState";
import PaymentItem from "./PaymentItem";
import PaymentCard3D from "./PaymentCard3D";
import PaymentModal from "./PaymentModal";
import { useSelector } from "react-redux";

const PaymentMethod = ({ user, onUpdatePaymentInfo, useLocationMapping }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingPayment, setEditingPayment] = useState(null);
  const provinces = useSelector((state) => state.address.provinces);

  const paymentInfo = useMemo(
    () => user?.paymentInfo || [],
    [user?.paymentInfo]
  );

  const showModal = (payment = null) => {
    setIsEditing(!!payment);
    setEditingPayment(payment);
    setIsModalVisible(true);
    setModalMode(payment ? "update" : "add");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditing(false);
    setEditingPayment(null);
  };

  const handleSubmit = useCallback(
    async (values) => {
      try {
        let updatedPaymentInfo;
        if (modalMode === "update") {
          updatedPaymentInfo = { ...values, _id: editingPayment?._id };
        } else if (modalMode === "add") {
          updatedPaymentInfo = values;
        }

        await onUpdatePaymentInfo(
          editingPayment?._id,
          updatedPaymentInfo,
          modalMode
        );

        handleCancel();
      } catch (error) {
        console.log(error);
      }
    },
    [modalMode, editingPayment, onUpdatePaymentInfo]
  );

  const handleDelete = useCallback(
    async (paymentId) => {
      const deletingPayment = paymentInfo.find((p) => p._id === paymentId);
      const confirmTitle = deletingPayment?.isDefault
        ? "Xác nhận xóa thẻ mặc định"
        : "Xác nhận xóa";
      const confirmContent = deletingPayment?.isDefault
        ? "Bạn đang xóa thẻ mặc định. Thẻ khác sẽ tự động được đặt làm mặc định. Bạn có chắc chắn muốn xóa?"
        : "Bạn có chắc chắn muốn xóa phương thức thanh toán này?";

      Modal.confirm({
        title: confirmTitle,
        content: confirmContent,
        onOk: async () => {
          try {
            await onUpdatePaymentInfo(paymentId, null, "delete");
          } catch (error) {
            console.log(error);
          }
        },
      });
    },
    [paymentInfo, onUpdatePaymentInfo]
  );

  const handleSetDefault = useCallback(
    async (value) => {
      try {
        if (!value.isDefault) {
          message.warning("Phải có ít nhất một thẻ mặc định!");
          return;
        }

        const updatedPaymentInfo = {
          ...paymentInfo.find((item) => item._id === value.id),
          isDefault: true,
        };

        await onUpdatePaymentInfo(value.id, updatedPaymentInfo, "update");
      } catch (error) {
        console.log(error);
      }
    },
    [paymentInfo, onUpdatePaymentInfo]
  );

  if (paymentInfo.length === 0) {
    return (
      <>
        <EmptyPaymentState onAddPayment={() => showModal(null)} />
        <PaymentModal
          isVisible={isModalVisible}
          isEditing={isEditing}
          editingPayment={editingPayment}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          provinces={provinces}
          useLocationMapping={useLocationMapping}
        />
      </>
    );
  }

  return (
    <div className="tab-content">
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Quản lý phương thức thanh toán"
            className="info-card"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => showModal()}
              >
                Thêm mới
              </Button>
            }
          >
            <div className="payment-list">
              {paymentInfo.map((payment) => (
                <PaymentItem
                  key={payment?._id}
                  payment={payment}
                  onEdit={() => showModal(payment)}
                  onDelete={() => handleDelete(payment?._id)}
                  onSetDefault={handleSetDefault}
                  setModalMode={(e) => setModalMode(e)}
                />
              ))}
            </div>
          </Card>
        </Col>

        <Col span={12}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px 0" }}
          >
            {paymentInfo.map((payment) => (
              <PaymentCard3D key={payment._id} payment={payment} />
            ))}
          </div>
        </Col>
      </Row>

      <PaymentModal
        isVisible={isModalVisible}
        isEditing={isEditing}
        editingPayment={editingPayment}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        provinces={provinces}
        useLocationMapping={useLocationMapping}
        setModalMode={(e) => setModalMode(e)}
      />
    </div>
  );
};

export default PaymentMethod;
