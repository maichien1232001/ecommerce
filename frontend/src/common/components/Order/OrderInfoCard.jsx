import { Card, Col, Row, Typography } from "antd";
import React, { memo } from "react";
import { formatCurrency, formatDetailedDate } from "../../../constants/common";

const { Text } = Typography;

const OrderInfoCard = memo(({ order }) => (
  <Card title="Thông tin đơn hàng" style={{ marginBottom: "16px" }}>
    <Row gutter={[16, 8]}>
      <Col span={12}>
        <Text strong>Mã đơn hàng:</Text> #{order._id.slice(-8)}
      </Col>
      <Col span={12}>
        <Text strong>Ngày đặt:</Text> {formatDetailedDate(order.createdAt)}
      </Col>
      <Col span={12}>
        <Text strong>Phương thức thanh toán:</Text> {order.paymentMethod}
      </Col>
      <Col span={12}>
        <Text strong>Tổng tiền:</Text>
        <Text
          style={{ color: "#1890ff", fontWeight: "bold", marginLeft: "8px" }}
        >
          {formatCurrency(order.totalAmount)}
        </Text>
      </Col>
    </Row>
  </Card>
));

export default OrderInfoCard;
