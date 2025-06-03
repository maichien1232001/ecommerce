import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Routers from "./routes";
import Notification from "./common/components/Notification";
import Auth from "./app/components/Auth/AuthHandler";
import { onLoad } from "./utils/onLoad";

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onLoad(dispatch);
  }, [dispatch]);

  return (
    <>
      <Routers />
      <Notification />
      <Auth />
    </>
  );
};

export default AppContent;
