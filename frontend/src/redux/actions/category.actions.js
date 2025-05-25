import { getListCategoryApi } from "../../apis/category.api";

export const getListCategories = () => async (dispatch) => {
  dispatch({ type: "CATEGORIES_REQUEST" });
  try {
    const response = await getListCategoryApi();
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
