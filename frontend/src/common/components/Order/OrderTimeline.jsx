import React, { memo } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { formatDetailedDate } from "../../../constants/common";
import { Card, Timeline } from "antd";

const OrderTimeline = memo(({ order }) => {
  const getTimelineItems = () => {
    const items = [
      {
        color: "blue",
        dot: <ShoppingCartOutlined />,
        children: (
          <div>
            <div>Đơn hàng được tạo</div>
            <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
              {formatDetailedDate(order.createdAt)}
            </div>
          </div>
        ),
      },
    ];

    if (order.paymentStatus === "Completed") {
      items.push({
        color: "green",
        dot: <CheckCircleOutlined style={{ color: "green" }} />,
        children: (
          <div>
            <div>Đơn hàng đã được thanh toán</div>
            <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
              {formatDetailedDate(order.updatedAt)}
            </div>
          </div>
        ),
      });
    }

    if (order.status === "Processing") {
      items.push({
        color: "blue",
        dot: <LoadingOutlined />,
        children: (
          <div>
            <div>Đang xử lý đơn hàng</div>
            <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
              Đơn hàng đang được chuẩn bị
            </div>
          </div>
        ),
      });
    }

    if (order.status === "Shipping") {
      items.push(
        {
          color: "blue",
          dot: <LoadingOutlined />,
          children: (
            <div>
              <div>Đơn hàng đang được giao</div>
              <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
                Đơn hàng đã được chuẩn bị xong
              </div>
            </div>
          ),
        },
        {
          color: "green",
          dot: <CheckCircleOutlined />,
          children: (
            <div>
              <div>Đã giao hàng thành công</div>
              <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
                Đơn hàng đã được giao đến khách hàng
              </div>
            </div>
          ),
        }
      );
    }
    if (order.status === "Delivered") {
      items.push(
        {
          color: "blue",
          dot: <LoadingOutlined />,
          children: (
            <div>
              <div>Đã xử lý đơn hàng</div>
              <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
                Đơn hàng đã được chuẩn bị xong
              </div>
            </div>
          ),
        },
        {
          color: "green",
          dot: <CheckCircleOutlined />,
          children: (
            <div>
              <div>Đã giao hàng thành công</div>
              <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
                Đơn hàng đã được giao đến khách hàng
              </div>
            </div>
          ),
        }
      );
    }

    if (order.status === "Cancelled") {
      items.push({
        color: "red",
        dot: <CloseCircleOutlined />,
        children: (
          <div>
            <div>Đơn hàng đã bị hủy</div>
            <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
              Đơn hàng đã được hủy bỏ
            </div>
          </div>
        ),
      });
    }

    return items;
  };

  return (
    <Card title="Lịch sử đơn hàng">
      <Timeline items={getTimelineItems()} />
    </Card>
  );
});

export default OrderTimeline;
