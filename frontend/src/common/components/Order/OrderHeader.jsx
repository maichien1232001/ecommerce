import {
  CalendarOutlined,
  EditOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React, { memo } from "react";
import { formatDate } from "../../../constants/common";
import { useSelector } from "react-redux";

const OrderHeader = memo(({ order, onViewDetails, onEditStatus }) => {
  const { user } = useSelector((state) => state?.user);
  return (
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
        <Tooltip title={"Xem chi tiết đơn hàng"}>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => onViewDetails(order)}
            className="text-blue-500 hover:text-blue-600"
          />
        </Tooltip>
        {user?.role === "admin" && (
          <Tooltip title={"Cập nhật trạng thái đơn hàng"}>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEditStatus(order)}
              className="text-blue-500 hover:text-blue-600"
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
});

export default OrderHeader;
