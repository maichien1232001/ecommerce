import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RouterRoot from "./RouterRoot";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../common/Layouts/MainLayout";
import BlankLayout from "../common/Layouts/BlankLayout";
import AdminLayout from "../common/Layouts/AdminLayout";
import Login from "../app/components/Login/Login";
import Register from "../app/components/Register/Register";
import DashBoard from "../features/admin/DashBoard";
import { ListProducts } from "../features/admin/Products/ListProducts";
import Setting from "../app/components/Settings";
import Account from "../features/admin/Account";
import ForgotPassword from "../app/components/ForgotPassword";
import HomePage from "../features/shop/Home";
import ShopPage from "../features/shop/Shop";
import DetailProduct from "../features/shop/DetailProduct";
import Error403 from "../common/components/Errors/Error403";
import RoleBasedRedirect from "./RoleBasedRedirect";

const Routers = () => (
  <Router>
    <Routes>
      {/* default route */}
      <Route path="/" element={<RoleBasedRedirect />} />
      {/* shop route */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <RouterRoot layout={MainLayout} element={HomePage} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accounts"
        element={
          <ProtectedRoute>
            <RouterRoot layout={MainLayout} element={Account} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <RouterRoot layout={MainLayout} element={ShopPage} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/product/:productId"
        element={
          <ProtectedRoute>
            <RouterRoot layout={MainLayout} element={DetailProduct} />
          </ProtectedRoute>
        }
      />
      {/* admin route */}
      <Route
        path="/login"
        element={<RouterRoot layout={BlankLayout} element={Login} />}
      />
      <Route
        path="/forgot-password"
        element={<RouterRoot layout={BlankLayout} element={ForgotPassword} />}
      />
      <Route
        path="/register"
        element={<RouterRoot layout={BlankLayout} element={Register} />}
      />
      <Route
        path="/admin/"
        element={
          <ProtectedRoute requiredRole="admin">
            <RouterRoot layout={AdminLayout} element={DashBoard} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute requiredRole="admin">
            <RouterRoot layout={AdminLayout} element={ListProducts} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/accounts"
        element={
          <ProtectedRoute requiredRole="admin">
            <RouterRoot layout={AdminLayout} element={Account} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute requiredRole="admin">
            <RouterRoot layout={AdminLayout} element={Setting} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/unauthorized"
        element={
          <ProtectedRoute>
            <RouterRoot layout={BlankLayout} element={Error403} />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default Routers;
