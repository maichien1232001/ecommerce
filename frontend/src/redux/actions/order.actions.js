import {
  createOrderApi,
  getAllOrderApi,
  getUserOrderApi,
  updateOrderStatusApi,
} from "../../apis/order.api";
import { notifyError } from "../../common/components/Tostify";

export const addOrder = (values) => async (dispatch) => {
  dispatch({ type: "ADD_ORDER_REQUEST" });
  try {
    const response = await createOrderApi(values);
    const { orderId } = response;
    localStorage.setItem("orderId", orderId);
    dispatch({
      type: "ADD_ORDER_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: "ADD_ORDER_FAILURE",
      payload: error.message,
    });
    notifyError(error.message);
    throw error;
  }
};
export const updateOrderStatus = (values) => async (dispatch) => {
  dispatch({ type: "UPDATE_ORDER_STATUS_REQUEST" });
  try {
    const response = await updateOrderStatusApi(values);
    dispatch({
      type: "UPDATE_ORDER_STATUS_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_ORDER_STATUS_FAILURE",
      payload: error.message,
    });
    notifyError(error.message);
  }
};

export const getOrderUser = (values) => async (dispatch) => {
  dispatch({ type: "GET_ORDER_USER_REQUEST" });
  try {
    const response = await getUserOrderApi(values);
    dispatch({
      type: "GET_ORDER_USER_SUCCESS",
      payload: response?.data,
    });
  } catch (error) {
    dispatch({
      type: "GET_ORDER_USER_FAILURE",
      payload: error.message,
    });
    notifyError(error.message);
  }
};

export const getAllOrder = (values) => async (dispatch) => {
  dispatch({ type: "GET_ALL_ORDER_REQUEST" });
  try {
    const response = await getAllOrderApi(values);
    dispatch({
      type: "GET_ALL_ORDER_SUCCESS",
      payload: response?.data,
    });
  } catch (error) {
    dispatch({
      type: "GET_ALL_ORDER_FAILURE",
      payload: error.message,
    });
    notifyError(error.message);
  }
};

export const updatePagination = (payload) => {
  return {
    type: "UPDATE_PAGINATION",
    payload,
  };
};
