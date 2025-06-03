import { useSelector } from "react-redux";
import { getProvinces } from "../redux/actions/address.actions";
import { getListBrand } from "../redux/actions/brand.actions";
import { getListCategories } from "../redux/actions/category.actions";
import { getUserProfile } from "../redux/actions/user.actions";
import { getWishList } from "../redux/actions/wishlist.actions";

export const onLoad = (dispatch, navigate) => {
  const token = localStorage.getItem("accessToken");
  try {
    dispatch(getListCategories());
    dispatch(getListBrand());
    dispatch(getProvinces());
    if (token) {
      dispatch(getUserProfile(token));
    }
    dispatch(getWishList());
  } catch (err) {
    console.error("Lỗi khi onLoad:", err);
  }
};
