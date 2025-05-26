import React from "react";
import HeaderCommon from "../../app/components/Header";

const MainLayout = ({ children }) => {
  return (
    <div>
      <HeaderCommon />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
