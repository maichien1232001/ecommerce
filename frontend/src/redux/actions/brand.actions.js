import { getListBrandApi } from "../../apis/brand.api";

export const getListBrand = () => async (dispatch) => {
  dispatch({ type: "BRAND_REQUEST" });
  try {
    const response = await getListBrandApi();
    dispatch({
      type: "BRAND_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: "BRAND_FAILURE",
      payload: error.message,
    });
  }
};
