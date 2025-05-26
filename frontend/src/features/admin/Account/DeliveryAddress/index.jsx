import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import AddressCard from "./AddressCard";
import AddressFormModal from "./AddressFormModal";
import AddressViewModal from "./AddressViewModal";
import EmptyAddressState from "./EmptyAddressState";

const DeliveryAddress = (props) => {
  const { addressForm, onFinishAddress, user } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const shippingAddresses = user?.shippingAddresses || [];
  const provinces = useSelector((state) => state.address.provinces);

  const showAddModal = () => {
    setModalMode("add");
    setSelectedAddress(null);
    addressForm.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (address) => {
    setModalMode("update");
    setSelectedAddress(address);
    addressForm.setFieldsValue(address);
    setIsModalVisible(true);
  };

  const showViewModal = (address) => {
    setSelectedAddress(address);
    setViewModalVisible(true);
  };

  const handleDelete = (address) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa địa chỉ này không?",
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      async onOk() {
        try {
          setLoading(true);
          await onFinishAddress(address._id, null, "delete");
        } catch (error) {
          message.error("Có lỗi xảy ra khi xóa địa chỉ!");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleSetDefault = async (address) => {
    try {
      setLoading(true);
      const addressData = {
        ...address,
        isDefault: true,
      };
      await onFinishAddress(address._id, addressData, "update");
    } catch (error) {
      console.error("Set default address error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = async (values) => {
    try {
      setLoading(true);
      let addressData = {};

      if (modalMode === "add") {
        addressData = {
          ...values,
        };
        await onFinishAddress(null, addressData, modalMode);
      } else if (modalMode === "update") {
        addressData = {
          ...values,
          _id: selectedAddress._id,
        };
        await onFinishAddress(selectedAddress._id, addressData, modalMode);
      }

      setIsModalVisible(false);
    } catch (error) {
      console.error("Address operation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Địa chỉ giao hàng"
      extra={
        shippingAddresses.length > 0 && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showAddModal}
            loading={loading}
          >
            Thêm địa chỉ
          </Button>
        )
      }
    >
      {shippingAddresses.length > 0 ? (
        <div className="address-list">
          {shippingAddresses.map((address, index) => (
            <AddressCard
              key={address._id || index}
              address={address}
              onEdit={() => showEditModal(address)}
              onDelete={() => handleDelete(address)}
              onView={() => showViewModal(address)}
              onSetDefault={() => handleSetDefault(address)}
              loading={loading}
              showSetDefault={!address.isDefault}
            />
          ))}
        </div>
      ) : (
        <EmptyAddressState onAdd={showAddModal} loading={loading} />
      )}

      <AddressFormModal
        visible={isModalVisible}
        mode={modalMode}
        form={addressForm}
        provinces={provinces}
        loading={loading}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleModalSubmit}
        hideDefaultCheckbox={true}
      />

      <AddressViewModal
        visible={viewModalVisible}
        address={selectedAddress}
        onCancel={() => setViewModalVisible(false)}
        onEdit={showEditModal}
        onSetDefault={handleSetDefault}
        loading={loading}
        showSetDefault={selectedAddress && !selectedAddress.isDefault}
      />
    </Card>
  );
};

export default DeliveryAddress;
