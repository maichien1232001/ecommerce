import {
  CalendarOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { formatDate } from "../../../constants/common";

const OrderHeader = React.memo(({ order, onViewDetails }) => (
  <div className="order-header">
    <div className="order-info">
      <div className="order-id">
        <ShoppingCartOutlined /> Đơn hàng #{order._id.slice(-8)}
      </div>
      <div className="order-date">
        <CalendarOutlined /> {formatDate(order.createdAt)}
      </div>
    </div>
    <div className="order-actions">
      <Button
        type="text"
        icon={<EyeOutlined />}
        onClick={() => onViewDetails(order)}
        className="text-blue-500 hover:text-blue-600"
      />
    </div>
  </div>
));

export default OrderHeader;
