import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { getUserProfile } from "../../../redux/actions/user.actions";

const Auth = () => {
  const dispatch = useDispatch();
  const token =
    useSelector((state) => state.auths.accessToken) ||
    localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchUserData = async () => {
      if (token && performance.navigation.type === 1) {
        try {
          dispatch(getUserProfile(token));
        } catch (error) {
          message.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
          // dispatch(logout()); // Gọi action logout
        }
      }
    };
    fetchUserData();
  }, [token, dispatch]);
};

export default Auth;
