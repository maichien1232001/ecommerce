import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";
import { getUserProfile } from "../redux/actions/user.actions";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    // Nếu có token mà chưa có user, gọi lại user info
    if (token && !user && !loading) {
      dispatch(getUserProfile(token));
    }
  }, [token, user, dispatch, loading]);

  // ✅ Trường hợp route cho phép Guest
  if (!requiredRole) {
    return children;
  }

  // ✅ Nếu yêu cầu đăng nhập (có requiredRole)
  if (!token) {
    return <Navigate to="/login" />;
  }

  // ⏳ Loading hoặc chưa có role
  if (loading || !user || !user.role) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: 100 }}
      >
        <Spin tip="Đang kiểm tra quyền truy cập..." size="large" />
      </div>
    );
  }

  // ❌ Role không phù hợp
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  // ✅ Được phép
  return children;
};

export default ProtectedRoute;
