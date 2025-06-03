import React from "react";
import { Checkbox, Button, Space } from "antd";
import { GiftOutlined, ShareAltOutlined } from "@ant-design/icons";

const CartControls = ({ selectAll, onSelectAll, totalItems }) => {
  return (
    <div className="cart-controls">
      <Checkbox
        checked={selectAll}
        onChange={(e) => onSelectAll(e.target.checked)}
        className="select-all-checkbox"
      >
        Chọn tất cả ({totalItems} sản phẩm)
      </Checkbox>

      <Space className="cart-actions">
        <Button icon={<GiftOutlined />} className="promo-btn">
          Mã giảm giá
        </Button>
        <Button icon={<ShareAltOutlined />} className="share-btn">
          Chia sẻ
        </Button>
      </Space>
    </div>
  );
};

export default CartControls;
