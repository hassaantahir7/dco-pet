import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../config';
import { store } from '../store';
import { logout } from '../store/authActions';

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => {
        const { message, succeeded } = response.data;
        if (succeeded === false) {
            toast.error(`Error: ${message}`);
        }
        return response;
    },
    error => {
        if (error.response) {
            toast.error(`Error: ${error.response.data.message}`);
            if (error.response.status === 401 && error.response.data.message === "Unauthenticated") 
            {
                store.dispatch(logout());
            }
        } else if (error.request) {
            toast.error('Error: No response was received from the server.');
        } else {
            toast.error('Error: ' + error.message);
        }
        return Promise.reject(error);
    }
);

export default api;