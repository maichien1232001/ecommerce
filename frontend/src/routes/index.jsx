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
import DashBoardManagement from "../management/components/DashBoardManagement";
import { ListProducts } from "../management/components/ProductsManagement/ListProducts";

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
        path="/register"
        element={<RouterRoot layout={BlankLayout} element={Register} />}
      />
      <Route
        path="/admin/"
        element={
          <ProtectedRoute>
            <RouterRoot layout={AdminLayout} element={DashBoardManagement} />
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
    </Routes>
  </Router>
);

export default Routers;
