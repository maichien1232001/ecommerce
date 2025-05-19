import {
  addProductApi,
  getProducts,
  importProducts,
  viewProductApi,
} from "../../apis/products";

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
  } catch (error) {
    console.log(error);
  }
};

export const viewProduct = (value) => async (dispatch) => {
  try {
    const res = await viewProductApi(value);
    await dispatch({
      type: "VIEW_PRODUCTS_SUCCESS",
      payload: { product: res.product },
    });
    return res.product; // 👈 trả về product
  } catch (error) {
    throw error;
  }
};

export const setPagination = (payload) => {
  return {
    type: "SET_PAGINATION",
    payload,
  };
};
