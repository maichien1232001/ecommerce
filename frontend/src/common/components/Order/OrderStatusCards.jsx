import { Card, Col, Row } from "antd";
import React, { memo } from "react";
import StatusBadge from "./StatusBadge";

const OrderStatusCards = memo(({ order }) => (
  <Row gutter={16} style={{ marginBottom: "24px" }}>
    <Col span={12}>
      <Card size="small">
        <div style={{ textAlign: "center" }}>
          <div
            style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}
          >
            Trạng thái đơn hàng
          </div>
          <StatusBadge status={order.status} />
        </div>
      </Card>
    </Col>
    <Col span={12}>
      <Card size="small">
        <div style={{ textAlign: "center" }}>
          <div
            style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}
          >
            Trạng thái thanh toán
          </div>
          <StatusBadge status={order.paymentStatus} type="payment" />
        </div>
      </Card>
    </Col>
  </Row>
));

export default OrderStatusCards;
