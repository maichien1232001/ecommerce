import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import axios from "axios";
import { saveUser } from "../../../redux/actions/auth.actions";
import API from "../../../config/axiosInterceptor";

const Auth = () => {
  const dispatch = useDispatch();
  const token =
    useSelector((state) => state.auths.accessToken) ||
    localStorage.getItem("authToken");
  useEffect(() => {
    const fetchUserData = async () => {
      if (token && performance.navigation.type === 1) {
        try {
          const res = API.get("http://localhost:8080/api/profile/", {
            headers: { Authorization: `Bearer ${token}` },
          });

          dispatch(saveUser(res.data)); // Lưu user vào Redux
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
