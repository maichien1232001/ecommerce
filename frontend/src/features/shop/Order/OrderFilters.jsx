import { FilterOutlined } from "@ant-design/icons";
import { Card, Col, Input, Row, Select } from "antd";
import React from "react";

const { Option } = Select;
const { Search } = Input;

const OrderFilters = React.memo(
  ({ searchTerm, statusFilter, onSearchChange, onStatusChange }) => (
    <div className="order-filters">
      <Card>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={16}>
            <Search
              placeholder="Tìm kiếm theo mã đơn hàng hoặc tên sản phẩm..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              size="large"
              allowClear
            />
          </Col>
          <Col xs={24} sm={8}>
            <Select
              value={statusFilter}
              onChange={onStatusChange}
              size="large"
              style={{ width: "100%" }}
              placeholder="Lọc theo trạng thái"
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">Tất cả trạng thái</Option>
              <Option value="Pending">Chờ xử lý</Option>
              <Option value="Processing">Đang xử lý</Option>
              <Option value="Delivered">Đã giao</Option>
              <Option value="Cancelled">Đã hủy</Option>
            </Select>
          </Col>
        </Row>
      </Card>
    </div>
  )
);
export default OrderFilters;
