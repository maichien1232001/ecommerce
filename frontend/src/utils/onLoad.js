import { getListCategories } from "../redux/actions/category.actions";

export const onLoad = async (dispatch, navigate) => {
  try {
    await dispatch(getListCategories());
  } catch (err) {
    console.error("Lỗi khi onLoad:", err);
  }
};
