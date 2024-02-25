import { API_URL } from '@/constants';
import { getAuthToken } from '@/utils/auth-token';
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

const authRoutesRegex = /^\/auth\//; // Regular expression to match routes starting with /auth/

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Check if the request is not for authentication routes
    if (!authRoutesRegex.test(config.url || '')) {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Do something with response error
    if (error.response && error.response.status === 401) {
      // Redirect to login page or handle unauthorized access
    }
    return Promise.reject({
      error: error?.response?.data || error.response.statusText,
    });
  }
);

export default api;
