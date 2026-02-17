import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

console.log('API Base URL:', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api');

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        // You can add global headers here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        const message = error.response?.data?.message || 'Something went wrong';

        // Silently handle 401s (Unauthorized) - common during session checks
        if (error.response?.status === 401) {
            return Promise.reject(error);
        }

        // We avoid console.error here to prevent triggering development overlays for handled API errors
        // The individual catch blocks or AuthContext will handle the error (usually via toast)
        return Promise.reject(error);
    }
);

export default api;
