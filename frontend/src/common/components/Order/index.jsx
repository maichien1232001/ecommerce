import React, { memo, useCallback, useState } from "react";
import { Col, Row, Typography } from "antd";
import { useDispatch } from "react-redux";
import { updatePagination } from "../../../redux/actions/order.actions";
import OrderCard from "./OrderCard";
import LoginRequired from "./LoginRequired";
import OrderFilters from "./OrderFilters";
import EmptyOrder from "./EmptyOrder";
import CustomPagination from "./CustomPagination";
import OrderDetailsModal from "./OrderDetailsModal";
import "./Order.scss";

const { Title, Text } = Typography;

const PageHeader = memo(({ title, subtitle }) => {
  return (
    <div className="page-header">
      <Title level={2} className="title">
        {title}
      </Title>
      <Text type="secondary">{subtitle}</Text>
    </div>
  );
});

const OrderGrid = memo(({ orders, onViewDetails }) => (
  <Row gutter={[16, 16]}>
    {orders.map((order) => (
      <Col xs={24} sm={12} lg={8} key={order._id}>
        <OrderCard order={order} onViewDetails={onViewDetails} />
      </Col>
    ))}
  </Row>
));

const OrderCommon = (props) => {
  const { orders, paginationState, isAuthenticated, pagination, title } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const handleStatusChange = useCallback((value) => {
    setStatusFilter(value);
  }, []);

  const handlePageChange = (page) => {
    dispatch(updatePagination({ ...pagination, page: page }));
  };

  const handleViewDetails = useCallback((order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setSelectedOrder(null);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="order-management">
        <PageHeader
          title="Quản Lý Đơn Hàng"
          subtitle="Theo dõi và quản lý tất cả đơn hàng của bạn"
        />
        <LoginRequired />
      </div>
    );
  }

  return (
    <div className="order-management">
      <PageHeader
        title={title}
        subtitle="Quản lý và theo dõi tất cả đơn hàng của bạn"
      />

      {/* <OrderFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
      /> */}

      {paginationState.totalCount === 0 ? (
        <EmptyOrder searchTerm={searchTerm} statusFilter={statusFilter} />
      ) : (
        <>
          <OrderGrid orders={orders} onViewDetails={handleViewDetails} />

          {paginationState.totalCount > pagination.limit && (
            <CustomPagination
              current={pagination.page}
              total={paginationState.totalCount}
              pageSize={pagination.limit}
              pagination={pagination}
              onChange={handlePageChange}
            />
          )}
        </>
      )}

      <OrderDetailsModal
        order={selectedOrder}
        visible={modalVisible}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default OrderCommon;
