// src/layouts/AdminLayout.js
import React from "react";
import NavBar from "../components/Navbar";
// import Sidebar from '../components/Sidebar';
// import AdminHeader from '../components/AdminHeader';

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <NavBar />
      <div style={{ flex: 1 }}>
        {/* <AdminHeader /> */}
        <main
          style={{
            padding: 16,
            height: "100vh",
            background: "linear-gradient(135deg, #f9f9f9, #ffffff)",
          }}
        >
          {children} {/* Các trang con sẽ được render ở đây */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
