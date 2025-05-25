import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RouterRoot from "./RouterRoot";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../common/Layouts/MainLayout";
import BlankLayout from "../common/Layouts/BlankLayout";
import AdminLayout from "../common/Layouts/AdminLayout";
import HomePage from "../app/components/Home";
import Login from "../app/components/Login/Login";
import Register from "../app/components/Register/Register";
import DashBoard from "../features/admin/DashBoard";
import { ListProducts } from "../features/admin/Products/ListProducts";
import Setting from "../app/components/Settings";
import Account from "../features/admin/Account";
import ForgotPassword from "../app/components/ForgotPassword";

const Routers = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <RouterRoot layout={MainLayout} element={HomePage} />
          </ProtectedRoute>
        }
      />
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
          <ProtectedRoute>
            <RouterRoot layout={AdminLayout} element={DashBoard} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute>
            <RouterRoot layout={AdminLayout} element={ListProducts} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/accounts"
        element={
          <ProtectedRoute>
            <RouterRoot layout={AdminLayout} element={Account} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <RouterRoot layout={AdminLayout} element={Setting} />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default Routers;
