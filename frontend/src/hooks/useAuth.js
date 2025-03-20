
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import axios from "axios";
import { login } from "../redux/actions/auth.actions";

const useAuth = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auths.accessToken) || localStorage.getItem("accessToken");

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                try {
                    const res = await axios.get("http://localhost:5000/api/user/profile", {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    dispatch(login(res)); // Lưu user vào Redux
                } catch (error) {
                    message.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
                    // dispatch(logout()); // Gọi action logout
                }
            }
        };

        fetchUserData();
    }, [token, dispatch]);
};

export default useAuth;
