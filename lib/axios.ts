import axios from 'axios';
import { store } from './store/store';
import { logout, tokenRefreshed } from './store/features/authSlice';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const isAuthRoute = originalRequest?.url?.includes('/auth/login') || originalRequest?.url?.includes('/auth/signup');

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token found');
                }
                const refreshUrl = BASE_URL.endsWith('/') ? `${BASE_URL}auth/refresh` : `${BASE_URL}/auth/refresh`;
                const { data } = await axios.post(refreshUrl, {}, {
                    headers: { Authorization: `Bearer ${refreshToken}` }
                });

                store.dispatch(tokenRefreshed(data));
                originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                return api(originalRequest);
            } catch (refreshError) {
                store.dispatch(logout());
                // Only redirect if we're not already on the login page to avoid refresh loops
                if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export default api