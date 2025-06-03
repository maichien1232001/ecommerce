import { Pagination } from "antd";
import React, { memo } from "react";

const CustomPagination = memo(({ current, total, pageSize, onChange }) => (
  <div className="pagination-container">
    <Pagination
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={onChange}
      showSizeChanger={false}
      showQuickJumper={false}
      showTotal={(total, range) =>
        `${range[0]}-${range[1]} của ${total} đơn hàng`
      }
    />
  </div>
));

export default CustomPagination;
