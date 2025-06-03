import React from "react";
import HeaderCommon from "../../app/components/Header";
import Footer from "../../app/components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <HeaderCommon />
      <main
        style={{
          minHeight: 400,
          paddingBottom: 16,
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
