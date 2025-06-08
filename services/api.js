import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

if (typeof window !== 'undefined') {
  api.interceptors.request.use(
    config => {
      const token = sessionStorage.getItem('token');

      if (
        !config.url.includes('/login') &&
        !config.url.includes('/create-user') &&
        token
      ) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        // Redireciona para o login em caso de erro 401
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
}