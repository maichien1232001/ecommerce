import React from "react";
import { Card, Tooltip, Tag } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const AddressCard = ({ address, index, onView, onEdit, onDelete }) => {
  const getFullAddress = (address) => {
    const parts = [
      address.detailAddress,
      address.ward,
      address.district,
      address.province,
    ].filter(Boolean);
    return parts.join(", ");
  };

  return (
    <Card
      key={address.id || index}
      className="address-card"
      style={{ marginBottom: 16 }}
      actions={[
        <Tooltip title="Xem chi tiết">
          <EyeOutlined onClick={() => onView(address)} />
        </Tooltip>,
        <Tooltip title="Chỉnh sửa">
          <EditOutlined onClick={() => onEdit(address)} />
        </Tooltip>,
        <Tooltip title="Xóa">
          <DeleteOutlined onClick={() => onDelete(address)} />
        </Tooltip>,
      ]}
    >
      <div className="address-content">
        <div className="address-header">
          <h4
            style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}
          >
            <HomeOutlined />
            {address.receiverName}
            {address.isDefault && (
              <Tag color="blue" size="small">
                Mặc định
              </Tag>
            )}
          </h4>
          <p style={{ margin: "4px 0", color: "#666" }}>
            {address.receiverPhone}
          </p>
        </div>
        <div className="address-detail">
          <p style={{ margin: 0, color: "#333" }}>{getFullAddress(address)}</p>
        </div>
      </div>
    </Card>
  );
};

export default AddressCard;
