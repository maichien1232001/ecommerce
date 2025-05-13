import { getProducts } from "../../apis/products";

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

export const setPagination = (payload) => {
  return {
    type: "SET_PAGINATION",
    payload,
  };
};
