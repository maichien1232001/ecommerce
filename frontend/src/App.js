// src/App.js
import React, { useEffect } from 'react';
import Routers from './routes';
import { Provider } from 'react-redux';
import store from './redux/store';
import Notification from './common/components/Notification';
import Auth from './app/components/Auth/AuthHandler';

function App() {
  return (
    <>
      <Provider store={store}>
        <Routers />
        <Notification />
        <Auth />
      </Provider>
    </>
  );
}

export default App;
