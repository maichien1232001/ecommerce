import React from "react";
import { Button, InputNumber, Typography } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const { Text } = Typography;

const QuantityControls = ({
  quantity,
  maxStock,
  onQuantityChange,
  isDisabled,
}) => {
  return (
    <div className="quantity-controls">
      <Text strong className="quantity-label">
        Số lượng:
      </Text>
      <div className="quantity-input-group">
        <Button
          icon={<MinusOutlined />}
          size="small"
          onClick={() => onQuantityChange(quantity - 1)}
          disabled={quantity <= 1 || isDisabled}
          className="quantity-btn"
        />
        <InputNumber
          min={1}
          max={maxStock}
          value={quantity}
          onChange={onQuantityChange}
          className="quantity-input"
          disabled={isDisabled}
          controls={false}
        />
        <Button
          icon={<PlusOutlined />}
          size="small"
          onClick={() => onQuantityChange(quantity + 1)}
          disabled={quantity >= maxStock || isDisabled}
          className="quantity-btn"
        />
      </div>
    </div>
  );
};

export default QuantityControls;
