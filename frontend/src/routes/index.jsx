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
import Cart from "../features/shop/Cart";
import Checkout from "../features/shop/Checkout";
import VNPayReturn from "../common/components/VnPayReturn";
import Wishlist from "../features/shop/WishList";
import Contact from "../app/components/Contact";
import ListOrders from "../features/admin/Order/ListOrders";
import Order from "../features/shop/Order/Order";
import Categories from "../features/Categories";

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
        path="/order"
        element={
          <ProtectedRoute>
            <RouterRoot layout={MainLayout} element={Order} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vnpay_return"
        element={
          <ProtectedRoute>
            <RouterRoot layout={MainLayout} element={VNPayReturn} />
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
        path="/wishlist"
        element={
          <ProtectedRoute>
            <RouterRoot layout={MainLayout} element={Wishlist} />
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
        path="/contact"
        element={
          <ProtectedRoute>
            <RouterRoot layout={MainLayout} element={Contact} />
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
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <RouterRoot layout={MainLayout} element={Cart} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <RouterRoot layout={MainLayout} element={Checkout} />
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
        path="/admin/orders"
        element={
          <ProtectedRoute requiredRole="admin">
            <RouterRoot layout={AdminLayout} element={ListOrders} />
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
        path="/admin/category"
        element={
          <ProtectedRoute requiredRole="admin">
            <RouterRoot layout={AdminLayout} element={Categories} />
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
