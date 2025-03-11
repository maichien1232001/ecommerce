// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './auth.reducers';

const rootReducer = combineReducers({
    auths: authReducer,
    // Thêm các reducer khác nếu có
});

export default rootReducer;
