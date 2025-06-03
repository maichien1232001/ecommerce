import React from "react";
import { Card, Tooltip, Tag, Button } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  HomeOutlined,
  StarOutlined,
} from "@ant-design/icons";

const AddressCard = ({
  address,
  index,
  onView,
  onEdit,
  onDelete,
  onSetDefault,
  loading,
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

  const actions = [
    <Tooltip title="Xem chi tiết">
      <EyeOutlined onClick={() => onView(address)} />
    </Tooltip>,
    <Tooltip title="Chỉnh sửa">
      <EditOutlined onClick={() => onEdit(address)} />
    </Tooltip>,
    <Tooltip title="Xóa">
      <DeleteOutlined onClick={() => onDelete(address)} />
    </Tooltip>,
  ];

  if (showSetDefault) {
    actions.splice(
      2,
      0,
      <Tooltip title="Đặt làm mặc định">
        <StarOutlined
          onClick={() => onSetDefault(address)}
          style={{ color: "#faad14" }}
        />
      </Tooltip>
    );
  }

  return (
    <Card
      key={address.id || index}
      className="address-card"
      style={{ marginBottom: 16 }}
      actions={actions}
      loading={loading}
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

        {/* Nút đặt làm mặc định nằm bên ngoài actions */}
        {/* {showSetDefault && (
          <div style={{ marginTop: 12, textAlign: "right" }}>
            <Button
              size="small"
              type="dashed"
              icon={<StarOutlined />}
              onClick={() => onSetDefault(address)}
              loading={loading}
            >
              Đặt làm mặc định
            </Button>
          </div>
        )} */}
      </div>
    </Card>
  );
};

export default AddressCard;
