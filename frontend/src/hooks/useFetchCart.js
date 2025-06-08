import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../redux/actions/cart.actions";
import _ from "lodash";

const useFetchCart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user || state.auths);
  const sessionId = localStorage.getItem("sessionID");
  const fetchCart = async () => {
    try {
      let response;
      if (!_.isEmpty(user)) {
        response = await dispatch(getCart(user?._id, null));
      } else {
        response = await dispatch(getCart(null, sessionId));
      }
      return response;
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      throw error;
    }
  };
  return { fetchCart };
};

export default useFetchCart;
