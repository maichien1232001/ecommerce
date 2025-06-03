import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("accessToken");
  const { user, loading } = useSelector((state) => state.auth || state?.user);
  console.log(loading);
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (loading || !user || !user.role) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: 100 }}
      >
        <Spin tip="Đang kiểm tra quyền truy cập..." size="large" />
      </div>
    );
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
