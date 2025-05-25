import React, { useState, useMemo, useCallback } from "react";
import { Row, Col, Card, Button, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import EmptyPaymentState from "./EmptyPaymentState";
import PaymentItem from "./PaymentItem";
import PaymentCard3D from "./PaymentCard3D";
import PaymentModal from "./PaymentModal";
import { useSelector } from "react-redux";
import {
  notifyError,
  notifySuccess,
} from "../../../../common/components/Tostify";
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

  const defaultPayment = useMemo(
    () => paymentInfo.find((payment) => payment?.isDefault) || paymentInfo[0],
    [paymentInfo]
  );

  const showModal = useCallback((payment = null) => {
    setIsEditing(!!payment);
    setEditingPayment(payment);
    setIsModalVisible(true);
    setModalMode("add");
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    setIsEditing(false);
    setEditingPayment(null);
  }, []);

  const handleSubmit = useCallback(
    async (values) => {
      try {
        let updatedPaymentInfo;
        if (modalMode === "update") {
          updatedPaymentInfo = { ...values, _id: editingPayment?._id };
        } else if (modalMode === "add") {
          updatedPaymentInfo = {
            ...values,
            isDefault: true,
          };
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
    [isEditing, editingPayment, paymentInfo, onUpdatePaymentInfo, handleCancel]
  );

  const handleDelete = useCallback(
    async (paymentId) => {
      Modal.confirm({
        title: "Xác nhận xóa",
        content: "Bạn có chắc chắn muốn xóa phương thức thanh toán này?",
        onOk: async () => {
          try {
            const updatedPaymentInfo = paymentInfo.filter(
              (item) => item?._id !== paymentId
            );

            if (updatedPaymentInfo.length > 0) {
              const deletedPayment = paymentInfo.find(
                (item) => item?.id === paymentId
              );
              if (deletedPayment?.isDefault) {
                updatedPaymentInfo[0].isDefault = true;
              }
            }
            await onUpdatePaymentInfo(paymentId, updatedPaymentInfo, "delete");
          } catch (error) {}
        },
      });
    },
    [paymentInfo, onUpdatePaymentInfo]
  );

  const handleSetDefault = useCallback(
    async (value) => {
      try {
        const updatedPaymentInfo = {
          ...paymentInfo.find((item) => item.id === value?.id),
          isDefault: value?.isDefault,
        };
        await onUpdatePaymentInfo(value?.id, updatedPaymentInfo, "update");
      } catch (error) {
        console.log(error);
      }
    },
    [paymentInfo, onUpdatePaymentInfo]
  );

  if (paymentInfo.length === 0) {
    return (
      <>
        <EmptyPaymentState onAddPayment={() => showModal()} />
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
                  onEdit={showModal}
                  onDelete={() => handleDelete(payment?._id)}
                  onSetDefault={handleSetDefault}
                  setModalMode={(e) => setModalMode(e)}
                />
              ))}
            </div>
          </Card>
        </Col>

        <Col span={12}>
          {defaultPayment && <PaymentCard3D payment={defaultPayment} />}
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
