// api/api.js
import axios from 'axios'

const proxy = 'http://localhost:5000/api'

export const registerApi = async (values) => {
    try {
        const response = await axios.post(`${proxy}/auth/register`, values);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Something went wrong');
    }
};

export const loginApi = async (values) => {
    try {
        const response = await axios.post(`${proxy}/auth/login`, values);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Something went wrong');
    }
};
