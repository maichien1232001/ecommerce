import {
  addToCartApi,
  deleteCartApi,
  getCartApi,
  updateItemQuantityApi,
} from "../../apis/cart.api";
import { notifyError, notifySuccess } from "../../common/components/Tostify";

export const addToCart =
  (userId, productId, quantity, sessionID) => async (dispatch) => {
    dispatch({ type: "ADD_TO_CART_REQUEST" });
    try {
      const response = await addToCartApi(
        userId,
        productId,
        quantity,
        sessionID
      );
      dispatch({
        type: "ADD_TO_CART_SUCCESS",
        payload: response,
      });
      return Promise.resolve(response);
    } catch (error) {
      dispatch({
        type: "ADD_TO_CART_FAILURE",
        payload: error.message,
      });
      return Promise.reject(error);
    }
  };
export const getCart = (userId, sessionID) => async (dispatch) => {
  dispatch({ type: "GET_CART_REQUEST" });
  try {
    const response = await getCartApi(userId, sessionID);
    dispatch({
      type: "GET_CART_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: "GET_CART_FAILURE",
      payload: error.message,
    });
  }
};
export const updateItemQuantity =
  (userId, sessionID, productId, quantity) => async (dispatch) => {
    dispatch({ type: "UPDATE_QUANTITY_REQUEST" });
    try {
      const response = await updateItemQuantityApi(
        userId,
        sessionID,
        productId,
        quantity
      );
      dispatch({
        type: "UPDATE_QUANTITY_SUCCESS",
        payload: response,
      });
      notifySuccess("Số lượng đã được cập nhật!");
    } catch (error) {
      dispatch({
        type: "UPDATE_QUANTITY_FAILURE",
        payload: error.message,
      });
      notifyError("Không thể cập nhật số lượng. Vui lòng thử lại.");
    }
  };

export const deleteCart =
  (userId, sessionID, productId) => async (dispatch) => {
    dispatch({ type: "DELETE_CART_REQUEST" });
    try {
      const response = await deleteCartApi(userId, sessionID, productId);
      console.log(response);
      dispatch({
        type: "DELETE_CART_SUCCESS",
        payload: response,
      });
      notifySuccess("Xoá thành công!");
    } catch (error) {
      dispatch({
        type: "DELETE_CART_FAILURE",
        payload: error.message,
      });
      notifyError("Xoá không thành công!");
    }
  };
