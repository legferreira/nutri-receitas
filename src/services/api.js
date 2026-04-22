import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Trata o padrão { code, message, details } do backend
    const message =
      error.response?.data?.message ||
      error.message ||
      'Erro inesperado. Tente novamente.';
    return Promise.reject(new Error(message));
  }
);

export default api;
