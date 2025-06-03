import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleBasedRedirect = () => {
  const token = localStorage.getItem("accessToken");
  const { user } = useSelector((state) => state.auth || state.user);

  if (user.role === "admin") {
    return <Navigate to="/admin" />;
  }

  return <Navigate to="/home" />;
};

export default RoleBasedRedirect;
