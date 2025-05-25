import { getProvincesApi } from "../../apis/provinces.api";

export const getProvinces = () => async (dispatch) => {
  dispatch({ type: "GET_PROVINCES_REQUEST" });
  try {
    const response = await getProvincesApi();
    dispatch({
      type: "GET_PROVINCES_SUCCESS",
      payload: response?.data,
    });
  } catch (error) {
    dispatch({
      type: "GET_PROVINCES_FAILURE",
      payload: error.message,
    });
  }
};
export const searchProvinces = (values) => async (dispatch) => {
  try {
    const response = await getProvincesApi(values);
    dispatch({
      type: "SEARCH_PROVINCES_SUCCESS",
      payload: response?.data,
    });
  } catch (error) {
    console.error(error);
  }
};
