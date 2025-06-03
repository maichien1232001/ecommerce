import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import _ from "lodash";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetchCart from "../../../hooks/useFetchCart";

const CartHeaderIcon = () => {
  const { fetchCart } = useFetchCart();
  const navigate = useNavigate();
  const { carts } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user || state.auth);
  useEffect(() => {
    fetchCart();
  }, [user]);
  return (
    <Badge count={carts.length} size="small">
      <ShoppingCartOutlined
        style={{ fontSize: 18, cursor: "pointer" }}
        onClick={() => navigate("/cart")}
      />
    </Badge>
  );
};

export default CartHeaderIcon;
