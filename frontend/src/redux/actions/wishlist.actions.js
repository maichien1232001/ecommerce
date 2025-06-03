import {
  addProductToWishListApi,
  getWishListApi,
  removeProductFromWishListApi,
} from "../../apis/wishlist.api";

export const getWishList = () => async (dispatch) => {
  dispatch({ type: "GET_WISH_LIST_REQUEST" });
  try {
    const response = await getWishListApi();
    dispatch({
      type: "GET_WISH_LIST_SUCCESS",
      payload: response?.data,
    });
  } catch (error) {
    dispatch({
      type: "GET_WISH_LIST_FAILURE",
      payload: error.message,
    });
  }
};
export const addProductToWishList = (value, navigate) => async (dispatch) => {
  dispatch({ type: "ADD_TO_WISH_LIST_REQUEST" });
  try {
    const response = await addProductToWishListApi(value);
    dispatch({
      type: "ADD_TO_WISH_LIST_SUCCESS",
      payload: response?.data,
    });
  } catch (error) {
    dispatch({
      type: "ADD_TO_WISH_LIST_FAILURE",
      payload: error.message,
    });
  }
};

export const removeProductFromWishList =
  (value, navigate) => async (dispatch) => {
    dispatch({ type: "REMOVE_WISH_LIST_REQUEST" });
    try {
      const response = await removeProductFromWishListApi(value);
      dispatch({
        type: "REMOVE_WISH_LIST_SUCCESS",
        payload: response?.data,
      });
    } catch (error) {
      dispatch({
        type: "REMOVE_WISH_LIST_FAILURE",
        payload: error.message,
      });
    }
  };
