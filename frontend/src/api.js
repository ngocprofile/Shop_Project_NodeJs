// frontend/src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: '/api', // → Gọi /api/categories → http://localhost:3000/api/categories
});

// === INTERCEPTOR: TOKEN ===
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === INTERCEPTOR: REFRESH TOKEN ===
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const res = await axios.post('/api/auth/refresh-token', { token: refreshToken });
        const { accessToken } = res.data;

        localStorage.setItem('accessToken', accessToken);
        API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        return API(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;