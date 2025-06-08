import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../../redux/actions/order.actions";
import OrderCommon from "../../../common/components/Order";

const ListOrders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);
  const { orders, pagination, paginationState } = useSelector(
    (state) => state.order
  );
  const isAuthenticated = !!user?._id;
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getAllOrder(pagination));
    }
  }, [isAuthenticated, pagination]);
  return (
    <OrderCommon
      title={"Quản lý đơn hàng"}
      orders={orders}
      paginationState={paginationState}
      pagination={pagination}
      isAuthenticated={isAuthenticated}
    />
  );
};

export default ListOrders;
