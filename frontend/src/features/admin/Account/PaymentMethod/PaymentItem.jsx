import React, { memo, useMemo } from "react";
import { Button, Card, Dropdown } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  CreditCardOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";

const PaymentItem = ({
  payment,
  onEdit,
  onDelete,
  onSetDefault,
  setModalMode,
}) => {
  const handleEdit = () => {
    onEdit(payment);
    setModalMode("update");
  };
  const handleDelete = () => {
    onDelete(payment?._id);
    setModalMode("delete");
  };
  const dropdownMenu = useMemo(
    () => ({
      items: [
        {
          key: "setDefault",
          label: payment?.isDefault ? "Huỷ thẻ mặc định" : "Đặt làm mặc định",
          icon: payment?.isDefault ? <StarFilled /> : <StarOutlined />,
          onClick: () =>
            onSetDefault({
              id: payment?._id,
              isDefault: !payment?.isDefault,
            }),
        },

        {
          key: "edit",
          label: "Chỉnh sửa",
          icon: <EditOutlined />,
          onClick: () => handleEdit(),
        },
        {
          key: "delete",
          label: "Xóa",
          icon: <DeleteOutlined />,
          danger: true,
          onClick: () => handleDelete(),
        },
      ],
    }),
    [payment, onEdit, onDelete, onSetDefault]
  );

  const maskedCardNumber = useMemo(() => {
    if (!payment?.cardNumber) return "**** **** **** ****";
    return payment.cardNumber.replace(
      /(\d{4})(\d{4})(\d{4})(\d{4})/,
      "**** **** **** $4"
    );
  }, [payment?.cardNumber]);

  return (
    <Card
      size="small"
      className="payment-item-card"
      style={{ marginBottom: 12 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <CreditCardOutlined style={{ color: "#1890ff", fontSize: 20 }} />
          <div>
            <div
              style={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {maskedCardNumber}
              {payment?.isDefault && (
                <StarFilled style={{ color: "#faad14", fontSize: 14 }} />
              )}
            </div>
            <div style={{ color: "#666", fontSize: "12px" }}>
              {payment?.cardHolderName}
            </div>
          </div>
        </div>
        <Dropdown
          menu={dropdownMenu}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      </div>
    </Card>
  );
};

export default memo(PaymentItem);
