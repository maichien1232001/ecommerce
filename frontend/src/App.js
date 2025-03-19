// src/App.js
import React from 'react';
import Routers from './routes';
import { Provider } from 'react-redux';
import store from './redux/store';
import Notification from './common/components/Notification';

function App() {
  return (
    <>
      <Provider store={store}>
        <Routers />
        <Notification />
      </Provider>
    </>
  );
}

export default App;
