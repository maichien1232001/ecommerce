// api/api.js
import axios from 'axios'
import API from '../config/axiosInterceptor';

const proxy = 'http://localhost:5000/api'

export const registerApi = async (values) => {
    try {
        const response = await API.post(`${proxy}/auth/register`, values, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Something went wrong');
    }
};

export const loginApi = async (values) => {
    try {
        const response = await API.post(`${proxy}/auth/login`, values, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Something went wrong');
    }
};
