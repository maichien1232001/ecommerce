// src/layouts/AdminLayout.js
import React from "react";
import NavBar from "../components/Navbar";
// import AdminHeader from '../components/AdminHeader';

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <NavBar />
      <div style={{ flex: 1 }}>
        {/* <AdminHeader /> */}
        <main
          style={{
            overflow: "auto",
            padding: 16,
            paddingTop: 0,
            height: "100vh",
            background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
