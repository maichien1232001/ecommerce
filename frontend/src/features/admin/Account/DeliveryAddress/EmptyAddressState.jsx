import React from "react";
import { Empty, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const EmptyAddressState = ({ onAdd, loading = false }) => {
  return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Chưa có địa chỉ giao hàng nào"
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAdd}
          loading={loading}
        >
          Thêm địa chỉ giao hàng
        </Button>
      </Empty>
    </div>
  );
};

export default EmptyAddressState;
