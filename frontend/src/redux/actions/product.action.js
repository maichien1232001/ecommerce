import {
  addProductApi,
  deleteProductApi,
  editProductApi,
  getProducts,
  importProducts,
  viewProductApi,
} from "../../apis/products";
import { notifyError, notifySuccess } from "../../common/components/Tostify";

export const getListProducts = (values, navigate) => async (dispatch) => {
  dispatch({ type: "PRODUCTS_REQUEST" });
  try {
    const response = await getProducts(values);
    dispatch({
      type: "PRODUCTS_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCTS_FAILURE",
      payload: error.message,
    });
  }
};

export const importFileProducts = (value) => async (dispatch) => {
  try {
    const res = await importProducts(value);
    dispatch({
      type: "IMPORT_PRODUCTS_SUCCESS",
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = (value) => async (dispatch, getState) => {
  try {
    const res = await addProductApi(value);
    const { page, limit } = getState().products;
    await dispatch(getListProducts({ page, limit }));
    dispatch({
      type: "ADD_PRODUCTS_SUCCESS",
      payload: res,
    });
    console.log(res);
    notifySuccess("Thêm sản phẩm mới thành công!");
  } catch (error) {
    notifyError("Đã có lỗi xảy ra!");
    console.log(error);
  }
};

export const viewProduct = (value) => async (dispatch) => {
  try {
    const res = await viewProductApi(value);
    await dispatch({
      type: "VIEW_PRODUCTS_SUCCESS",
      payload: { product: res?.product },
    });
    return res?.product;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = (value) => async (dispatch) => {
  try {
    await deleteProductApi(value);
    await dispatch({
      type: "DELETE_PRODUCTS_SUCCESS",
      payload: value,
    });
    notifySuccess("Xóa sản phẩm thành công!");
  } catch (error) {
    notifyError("Đã có lỗi xảy ra!");
    throw error;
  }
};

export const editProduct = (id, value) => async (dispatch) => {
  try {
    const res = await editProductApi(id, value);
    await dispatch({
      type: "EDIT_PRODUCTS_SUCCESS",
      payload: res,
    });
    notifySuccess("Cập nhật sản phẩm thành công!");
    return res;
  } catch (error) {
    notifyError("Đã có lỗi xảy ra!");
    throw error;
  }
};

export const updateFilter = (payload) => {
  return {
    type: "UPDATE_FILTER",
    payload,
  };
};

export const setBuyNowProduct = (product) => (dispatch) => {
  dispatch({
    type: "SET_BUY_NOW_PRODUCT",
    payload: product,
  });
};

export const clearBuyNowProduct = () => (dispatch) => {
  dispatch({
    type: "CLEAR_BUY_NOW_PRODUCT",
  });
};

export const setCheckoutItems = (items) => ({
  type: "SET_CHECKOUT_ITEMS",
  payload: items,
});

export const clearCheckoutItems = () => ({
  type: "CLEAR_CHECKOUT_ITEMS",
});
