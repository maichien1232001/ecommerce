import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// Import các component đã tách
import AddressCard from "./AddressCard";
import AddressFormModal from "./AddressFormModal";
import AddressViewModal from "./AddressViewModal";
import EmptyAddressState from "./EmptyAddressState";
import { notifySuccess } from "../../../../common/components/Tostify";

const DeliveryAddress = (props) => {
  const { addressForm, onFinishAddress, onDeleteAddress, user } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const shippingAddresses = user?.shippingAddresses || [];
  const provinces = useSelector((state) => state.address.provinces);

  // Modal handlers
  const showAddModal = () => {
    setModalMode("add");
    setSelectedAddress(null);
    addressForm.resetFields();
    addressForm.setFieldsValue({ isDefault: false });
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
          // Call API to delete address using address._id
          await onFinishAddress(address._id, null, "delete");
          message.success("Đã xóa địa chỉ thành công!");
        } catch (error) {
          message.error("Có lỗi xảy ra khi xóa địa chỉ!");
          console.error("Delete address error:", error);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleModalSubmit = async (values) => {
    try {
      setLoading(true);
      let addressData = {};

      if (modalMode === "add") {
        addressData = {
          ...values,
        };
        await onFinishAddress(addressData, modalMode);
        notifySuccess("Thêm địa chỉ thành công!");
      } else if (modalMode === "update") {
        addressData = {
          ...values,
          _id: selectedAddress._id, // Include the address ID for update
        };
        await onFinishAddress(selectedAddress._id, addressData, modalMode);
        notifySuccess("Cập nhật địa chỉ thành công!");
      }

      setIsModalVisible(false);
    } catch (error) {
      message.error(
        modalMode === "add"
          ? "Có lỗi xảy ra khi thêm địa chỉ!"
          : "Có lỗi xảy ra khi cập nhật địa chỉ!"
      );
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
              loading={loading}
            />
          ))}
        </div>
      ) : (
        <EmptyAddressState onAdd={showAddModal} loading={loading} />
      )}

      {/* Add/Edit Modal */}
      <AddressFormModal
        visible={isModalVisible}
        mode={modalMode}
        form={addressForm}
        provinces={provinces}
        loading={loading}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleModalSubmit}
      />

      {/* View Modal */}
      <AddressViewModal
        visible={viewModalVisible}
        address={selectedAddress}
        onCancel={() => setViewModalVisible(false)}
        onEdit={showEditModal}
        loading={loading}
      />
    </Card>
  );
};

export default DeliveryAddress;
