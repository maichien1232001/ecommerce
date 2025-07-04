import { Empty } from "antd";
import React, { memo } from "react";

const EmptyOrder = memo(({ searchTerm, statusFilter }) => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description={
      <span>
        {searchTerm || statusFilter !== "all"
          ? "Không tìm thấy đơn hàng phù hợp"
          : "Bạn chưa có đơn hàng nào"}
      </span>
    }
  />
));

export default EmptyOrder;
