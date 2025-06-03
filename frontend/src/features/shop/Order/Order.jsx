import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderUser } from "../../../redux/actions/order.actions";
import OrderCommon from "../../../common/components/Order";

const Order = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth || state?.user);
  const { orders, pagination, paginationState } = useSelector(
    (state) => state.order
  );
  const isAuthenticated = !!user?._id;
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getOrderUser(pagination));
    }
  }, [isAuthenticated, pagination]);
  return (
    <OrderCommon
      title={"Đơn Hàng Của Tôi"}
      orders={orders}
      paginationState={paginationState}
      pagination={pagination}
      isAuthenticated={isAuthenticated}
    />
  );
};

export default Order;
