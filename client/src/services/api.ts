import axios from 'axios';
import type { SurveyConfig, SurveyResponse } from '@/types/survey';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication if needed
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
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const surveyApi = {
  getConfig: async (): Promise<SurveyConfig> => {
    const response = await api.get('/survey/config');
    return response.data;
  },

  submitResponse: async (responses: SurveyResponse): Promise<void> => {
    await api.post('/survey/responses', responses);
  },
};

export const authApi = {
  login: async (email: string, password: string): Promise<{ token: string }> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (email: string, password: string): Promise<{ token: string }> => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },
};

export const adminApi = {
  getResponses: async (): Promise<SurveyResponse[]> => {
    const response = await api.get('/admin/responses');
    return response.data;
  },

  updateConfig: async (config: SurveyConfig): Promise<void> => {
    await api.put('/admin/config', config);
  },
};

export default api; 