import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Tag,
  Select,
  DatePicker,
  Typography,
  Progress,
  List,
  Avatar,
  Badge,
  Spin,
  Empty,
} from "antd";
import { Column, Pie, Line, Area } from "@ant-design/charts";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  ProductOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { getAllOrder } from "../../../redux/actions/order.actions";
import { getListProducts } from "../../../redux/actions/product.action";
import { formatCurrency } from "../../../constants/common";
import _ from "lodash";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const DashboardManagemnet = () => {
  const dispatch = useDispatch();
  const [timeRange, setTimeRange] = useState("7days");

  const [dashboardData, setDashboardData] = useState({
    orders: [],
    products: [],
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
  });

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.order);
  const { allCategory } = useSelector((state) => state.category);
  const { loading } = useSelector((state) => state.order || state.products);

  const fetchDashboardData = async () => {
    try {
      await dispatch(getAllOrder({ page: 1, limit: 100 }));
      await dispatch(getListProducts({ page: 1, limit: 200 }));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (orders && products) {
      const totalRevenue = orders
        .filter((order) => order.paymentStatus === "Completed")
        .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

      const totalOrders = orders.length;

      const uniqueCustomers = [...new Set(orders.map((order) => order.user))]
        .length;

      setDashboardData({
        orders,
        products,
        totalRevenue,
        totalOrders,
        totalCustomers: uniqueCustomers,
        totalProducts: products.length,
      });
    }
  }, [orders, products]);

  // Lấy 3 đơn hàng gần nhất
  const recentOrders = useMemo(() => {
    return dashboardData.orders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, [dashboardData.orders]);

  const revenueData = useMemo(() => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      const dayOrders = dashboardData.orders.filter((order) => {
        const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
        return orderDate === dateStr && order.paymentStatus === "Completed";
      });

      const dayRevenue = dayOrders.reduce(
        (sum, order) => sum + (order.totalAmount || 0),
        0
      );

      last7Days.push({
        date: date.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
        }),
        revenue: dayRevenue,
        orders: dayOrders.length,
      });
    }
    return last7Days;
  }, [dashboardData.orders]);

  const orderStatusData = useMemo(() => {
    const statusCount = dashboardData.orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(statusCount).map(([status, count]) => ({
      status,
      count,
    }));
  }, [dashboardData.orders]);

  const lowStockProducts = useMemo(() => {
    return dashboardData.products
      .filter((product) => product.stock < 10)
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 5)
      .map((product) => ({
        name: product.name,
        stock: product.stock,
        minStock: 10,
      }));
  }, [dashboardData.products]);

  const categoryData = useMemo(() => {
    const categoryMap = allCategory.reduce((map, cat) => {
      map[cat._id] = cat.name;
      return map;
    }, {});

    const categoryCount = dashboardData.products.reduce((acc, product) => {
      const categoryId = product.category;
      const categoryName = categoryMap[categoryId] || "Khác";
      acc[categoryName] = (acc[categoryName] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(categoryCount).map(([type, value]) => ({
      type,
      value,
    }));
  }, [dashboardData.products, allCategory]);

  console.log(revenueData);

  const areaConfig = {
    data: revenueData,
    xField: "date",
    yField: "revenue",
    smooth: true,
    areaStyle: {
      fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
    },
    line: {
      color: "#1890ff",
    },
    yAxis: {
      label: {
        formatter: (v) => `${(v / 1000000).toFixed(0)}M`,
      },
    },
  };

  const pieConfig = {
    data: categoryData,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    innerRadius: 0.4,
    label: {
      text: (data) => `${data.value}`,
      style: {
        fontSize: 12,
        textAlign: "center",
      },
    },
    legend: {
      position: "bottom",
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
  };

  const columnConfig = {
    data: orderStatusData,
    xField: "status",
    yField: "count",
    columnWidthRatio: 0.6,
    color: ({ status }) => {
      const colors = {
        Pending: "#faad14",
        Processing: "#1890ff",
        Shipped: "#52c41a",
        Delivered: "#722ed1",
        Cancelled: "#f5222d",
      };
      return colors[status] || "#d9d9d9";
    },
  };

  const orderColumns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <Text code>{text.slice(-8)}</Text>,
    },
    {
      title: "Khách hàng",
      dataIndex: "shippingAddress",
      key: "customer",
      render: (address) => (
        <div>
          <div>{address?.receiverName}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {address?.receiverPhone}
          </Text>
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => <Text strong>{formatCurrency(amount)}</Text>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusColors = {
          Pending: "orange",
          Processing: "blue",
          Shipped: "cyan",
          Delivered: "green",
          Cancelled: "red",
        };
        return <Tag color={statusColors[status]}>{status}</Tag>;
      },
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => (
        <Tag color={status === "Completed" ? "success" : "warning"}>
          {status === "Completed" ? "Đã thanh toán" : "Chờ thanh toán"}
        </Tag>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <Spin size="large" />
        <div style={{ marginTop: "16px" }}>Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <div style={{ marginBottom: "24px" }}>
        <Row gutter={16} align="middle">
          <Col>
            <Select
              defaultValue="7days"
              value={timeRange}
              onChange={setTimeRange}
              style={{ width: 150 }}
            >
              <Select.Option value="today">Hôm nay</Select.Option>
              <Select.Option value="7days">7 ngày</Select.Option>
              <Select.Option value="30days">30 ngày</Select.Option>
              <Select.Option value="3months">3 tháng</Select.Option>
            </Select>
          </Col>
          <Col>
            <RangePicker />
          </Col>
        </Row>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={dashboardData.totalRevenue}
              formatter={(value) => formatCurrency(value)}
              prefix={<DollarOutlined style={{ color: "#3f8600" }} />}
              suffix={
                <span style={{ fontSize: "14px", color: "#3f8600" }}>
                  <ArrowUpOutlined /> 12.5%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng đơn hàng"
              value={dashboardData.totalOrders}
              prefix={<ShoppingCartOutlined style={{ color: "#1890ff" }} />}
              suffix={
                <span style={{ fontSize: "14px", color: "#3f8600" }}>
                  <ArrowUpOutlined /> 8.2%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Khách hàng"
              value={dashboardData.totalCustomers}
              prefix={<UserOutlined style={{ color: "#722ed1" }} />}
              suffix={
                <span style={{ fontSize: "14px", color: "#3f8600" }}>
                  <ArrowUpOutlined /> 5.4%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sản phẩm"
              value={dashboardData.totalProducts}
              prefix={<ProductOutlined style={{ color: "#fa8c16" }} />}
              suffix={
                <span style={{ fontSize: "14px", color: "#cf1322" }}>
                  <ArrowDownOutlined /> 2.1%
                </span>
              }
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} lg={16}>
          <Card title="Doanh thu theo ngày" extra={<BellOutlined />}>
            {revenueData.length > 0 ? (
              <Area {...areaConfig} height={300} />
            ) : (
              <Empty description="Không có dữ liệu" />
            )}
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Phân bố theo danh mục">
            {categoryData.length > 0 ? (
              <Pie {...pieConfig} height={300} />
            ) : (
              <Empty description="Không có dữ liệu" />
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} lg={12}>
          <Card title="Trạng thái đơn hàng">
            {orderStatusData.length > 0 ? (
              <Column {...columnConfig} height={250} />
            ) : (
              <Empty description="Không có dữ liệu" />
            )}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Cảnh báo tồn kho">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((product, index) => (
                <div key={index} style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "4px",
                    }}
                  >
                    <Text>{product.name}</Text>
                    <Text type="danger">
                      {product.stock}/{product.minStock}
                    </Text>
                  </div>
                  <Progress
                    percent={(product.stock / product.minStock) * 100}
                    status={
                      product.stock < product.minStock ? "exception" : "normal"
                    }
                    size="small"
                  />
                </div>
              ))
            ) : (
              <Empty description="Không có sản phẩm sắp hết hàng" />
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card title="Đơn hàng gần nhất">
            <Table
              dataSource={recentOrders}
              columns={orderColumns}
              pagination={false}
              size="small"
              rowKey="_id"
              locale={{ emptyText: <Empty description="Không có đơn hàng" /> }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card title="Sản phẩm mới nhất">
            <List
              itemLayout="horizontal"
              dataSource={dashboardData.products.slice(0, 5)}
              locale={{ emptyText: <Empty description="Không có sản phẩm" /> }}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Badge count={index + 1} offset={[-5, 5]}>
                        <Avatar src={item.images?.[0]} size={40} />
                      </Badge>
                    }
                    title={<Text strong>{item.name}</Text>}
                    description={
                      <div>
                        <div>Tồn kho: {item.stock}</div>
                        <Text type="success">{formatCurrency(item.price)}</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardManagemnet;
