import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Import redux-thunk
import myReducer from './reducers'; // Import reducer của bạn

const store = configureStore({
    reducer: myReducer, // Kết hợp các reducers của bạn
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk), // Thêm redux-thunk vào middleware
});

export default store;
