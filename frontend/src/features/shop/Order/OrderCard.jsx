import React from "react";
import { Card } from "antd";
import OrderHeader from "./OrderHeader";
import ProductList from "./ProductList";
import OrderStatusSection from "./OrderStatusSection";
import OrderFooter from "./OrderFooter";

const OrderCard = React.memo(({ order, onViewDetails }) => (
  <div className="order-card">
    <Card>
      <OrderHeader order={order} onViewDetails={onViewDetails} />
      <ProductList products={order.products} />
      <OrderStatusSection order={order} />
      <OrderFooter order={order} />
    </Card>
  </div>
));

export default OrderCard;
