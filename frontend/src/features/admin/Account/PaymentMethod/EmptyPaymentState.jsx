import React, { memo } from "react";
import { Button, Card, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const EmptyPaymentState = ({ onAddPayment }) => (
  <div className="tab-content">
    <Card title="Phương thức thanh toán" className="info-card">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Chưa có phương thức thanh toán nào"
      >
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddPayment}>
          Thêm phương thức thanh toán
        </Button>
      </Empty>
    </Card>
  </div>
);

export default memo(EmptyPaymentState);
