import { getListBrand } from "../redux/actions/brand.actions";
import { getListCategories } from "../redux/actions/category.actions";

export const onLoad = (dispatch, navigate) => {
  try {
    dispatch(getListCategories());
    dispatch(getListBrand());
  } catch (err) {
    console.error("Lỗi khi onLoad:", err);
  }
};
