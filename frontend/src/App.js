// src/App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppContent from "./AppConent";
import "./langs/index";

function App() {
  return (
    <>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </>
  );
}

export default App;
