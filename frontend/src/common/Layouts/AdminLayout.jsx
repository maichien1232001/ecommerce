import React from "react";
import NavBar from "../../app/components/Navbar";
import HeaderCommon from "../../app/components/Header";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <NavBar />
      <div style={{ flex: 1 }}>
        <HeaderCommon />
        <main
          style={{
            overflow: "auto",
            padding: 16,
            paddingTop: 0,
            height: "calc(100vh - 64px)",
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
