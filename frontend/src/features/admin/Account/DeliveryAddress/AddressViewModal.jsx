import React from "react";
import { Modal, Button, Tag } from "antd";
import { StarOutlined } from "@ant-design/icons";

const AddressViewModal = ({
  visible,
  address,
  onCancel,
  onEdit,
  onSetDefault,
  loading = false,
  showSetDefault = true,
}) => {
  const getFullAddress = (address) => {
    const parts = [
      address.detailAddress,
      address.ward,
      address.district,
      address.province,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const footerButtons = [
    <Button key="close" onClick={onCancel}>
      Đóng
    </Button>,
  ];

  footerButtons.splice(
    -1,
    0,
    <Button
      key="update"
      type="primary"
      onClick={() => {
        onCancel();
        onEdit(address);
      }}
    >
      Chỉnh sửa
    </Button>
  );

  return (
    <Modal
      title="Chi tiết địa chỉ"
      open={visible}
      onCancel={onCancel}
      footer={footerButtons}
    >
      {address && (
        <div className="address-detail-view">
          <div style={{ marginBottom: 16 }}>
            <strong>Người nhận:</strong> {address.receiverName}
            {address.isDefault && (
              <Tag color="blue" size="small" style={{ marginLeft: 8 }}>
                Mặc định
              </Tag>
            )}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Số điện thoại:</strong> {address.receiverPhone}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Địa chỉ:</strong> {getFullAddress(address)}
          </div>
          {address.postalCode && (
            <div style={{ marginBottom: 16 }}>
              <strong>Mã bưu điện:</strong> {address.postalCode}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default AddressViewModal;
