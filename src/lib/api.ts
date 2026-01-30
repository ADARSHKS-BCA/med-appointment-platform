import axios from 'axios';

// Create a configured axios instance
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Get refresh token
                const refreshToken = localStorage.getItem('refresh_token');

                if (refreshToken) {
                    // Call refresh endpoint
                    const response = await axios.post('http://localhost:8000/api/auth/token/refresh/', {
                        refresh: refreshToken
                    });

                    // Update local storage with new access token
                    const { access } = response.data;
                    localStorage.setItem('access_token', access);

                    // Update headers
                    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                    originalRequest.headers['Authorization'] = `Bearer ${access}`;

                    // Retry original request
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // If refresh fails, redirect to login (or handle as needed)
                console.error("Token refresh failed", refreshError);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('user');
                // You might dispatch a logout action here or redirect
            }
        }

        return Promise.reject(error);
    }
);

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
