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

  const handleSetDefault = () => {
    onSetDefault({
      id: payment?._id,
      isDefault: true,
    });
  };

  const dropdownMenu = useMemo(
    () => ({
      items: [
        ...(!payment?.isDefault
          ? [
              {
                key: "setDefault",
                label: "Đặt làm mặc định",
                icon: <StarOutlined />,
                onClick: handleSetDefault,
              },
            ]
          : []),
        {
          key: "edit",
          label: "Chỉnh sửa",
          icon: <EditOutlined />,
          onClick: handleEdit,
        },
        {
          key: "delete",
          label: "Xóa",
          icon: <DeleteOutlined />,
          danger: true,
          onClick: handleDelete,
        },
      ],
    }),
    [payment?.isDefault]
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
      style={{
        marginBottom: 12,
        border: payment?.isDefault ? "2px solid #1890ff" : "1px solid #d9d9d9",
      }}
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
                <>
                  <StarFilled style={{ color: "#faad14", fontSize: 14 }} />
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#1890ff",
                      fontWeight: "normal",
                      padding: "0 4px",
                      backgroundColor: "#e6f7ff",
                      borderRadius: "2px",
                    }}
                  >
                    Mặc định
                  </span>
                </>
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
