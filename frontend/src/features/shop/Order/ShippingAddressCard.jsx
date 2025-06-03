import React from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Card, Typography } from "antd";

const { Text } = Typography;
const ShippingAddressCard = React.memo(({ shippingAddress }) => {
  if (!shippingAddress) return null;

  return (
    <Card
      title={
        <>
          <EnvironmentOutlined /> Địa chỉ giao hàng
        </>
      }
      style={{ marginBottom: "16px" }}
    >
      <div>
        <div>
          <Text strong>Người nhận:</Text> {shippingAddress.fullName}
        </div>
        <div>
          <Text strong>Số điện thoại:</Text> {shippingAddress.phoneNumber}
        </div>
        <div>
          <Text strong>Địa chỉ:</Text> {shippingAddress.address}
        </div>
      </div>
    </Card>
  );
});

export default ShippingAddressCard;
