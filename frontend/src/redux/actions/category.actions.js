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

export const createCategory = () => async (dispatch) => {
  dispatch({ type: "CREATE_ITEM_CATEGORY_REQUEST" });
  try {
    const response = await createCategoryApi();
    dispatch({
      type: "CREATE_ITEM_CATEGORY_SUCCESS",
      payload: response,
    });
    notifySuccess("Cập nhật thành công");
  } catch (error) {
    dispatch({
      type: "CREATE_ITEM_CATEGORY_FAILURE",
      payload: error.message,
    });
    notifyError("Thất bại", error.message);
  }
};

export const updateItemCategory = () => async (dispatch) => {
  dispatch({ type: "UPDATE_ITEM_CATEGORY_REQUEST" });
  try {
    const response = await updateItemCategoryApi();
    dispatch({
      type: "UPDATE_ITEM_CATEGORY_SUCCESS",
      payload: response,
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

export const deleteItemCategory = () => async (dispatch) => {
  dispatch({ type: "DELETE_ITEM_CATEGORY_REQUEST" });
  try {
    const response = await deleteItemCategoryApi();
    dispatch({
      type: "DELETE_ITEM_CATEGORY_SUCCESS",
      payload: response,
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
