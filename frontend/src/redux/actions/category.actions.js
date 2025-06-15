import {
  createCategoryApi,
  deleteItemCategoryApi,
  getListCategoryApi,
  updateItemCategoryApi,
} from "../../apis/category.api";
import { notifyError, notifySuccess } from "../../common/components/Tostify";

export const getListCategories = (values) => async (dispatch) => {
  dispatch({ type: "CATEGORIES_REQUEST" });
  try {
    const response = await getListCategoryApi(values);
    dispatch({
      type: "CATEGORIES_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: "CATEGORIES_FAILURE",
      payload: error.message,
    });
  }
};

export const getAllCategories = (value) => async (dispatch) => {
  dispatch({ type: "GET_ALL_CATEGORIES_REQUEST" });
  try {
    const response = await getListCategoryApi(value);
    dispatch({
      type: "GET_ALL_CATEGORIES_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: "GET_ALL_CATEGORIES_FAILURE",
      payload: error.message,
    });
  }
};

export const createCategory = (values) => async (dispatch) => {
  dispatch({ type: "CREATE_ITEM_CATEGORY_REQUEST" });
  try {
    const response = await createCategoryApi(values);
    dispatch({
      type: "CREATE_ITEM_CATEGORY_SUCCESS",
      payload: response?.data?.category,
    });
    notifySuccess("Thành công", "Tạo danh mục thành công");
  } catch (error) {
    dispatch({
      type: "CREATE_ITEM_CATEGORY_FAILURE",
      payload: error.message,
    });
    notifyError("Thất bại", error.message);
  }
};

export const updateItemCategory = (values) => async (dispatch) => {
  dispatch({ type: "UPDATE_ITEM_CATEGORY_REQUEST" });
  try {
    const response = await updateItemCategoryApi(values);
    dispatch({
      type: "UPDATE_ITEM_CATEGORY_SUCCESS",
      payload: response?.category,
    });
    notifySuccess("Cập nhật thành công");
  } catch (error) {
    dispatch({
      type: "UPDATE_ITEM_CATEGORY_FAILURE",
      payload: error.message,
    });
    notifyError("Thất bại", error.message);
  }
};

export const deleteItemCategory = (values) => async (dispatch) => {
  dispatch({ type: "DELETE_ITEM_CATEGORY_REQUEST" });
  try {
    const response = await deleteItemCategoryApi(values);
    dispatch({
      type: "DELETE_ITEM_CATEGORY_SUCCESS",
      payload: response?.category?._id,
    });
    notifySuccess("Xóa thành công");
  } catch (error) {
    dispatch({
      type: "DELETE_ITEM_CATEGORY_FAILURE",
      payload: error.message,
    });
    notifyError("Thất bại", error.message);
  }
};

export const updateFilterCategory = (payload) => {
  return {
    type: "UPDATE_FILTER_CATEGORY",
    payload,
  };
};
