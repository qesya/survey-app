import { useCallback, useEffect } from "react";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface ApiRequestConfig extends AxiosRequestConfig {
  authToken?: string;
}

export function useApi() {
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          const silentError = new Error(error.message ?? "API Error");
          (silentError as unknown as { silentAuthError: boolean; original: unknown }).silentAuthError = true;
          (silentError as unknown as { silentAuthError: boolean; original: unknown }).original = error;
          return Promise.reject(silentError);
        }
        return Promise.reject(error instanceof Error ? error : new Error(error.message ?? 'API Error'));
      }
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const apiGet = useCallback(
    <T = unknown>(
      endpoint: string,
      config: ApiRequestConfig = {}
    ): Promise<AxiosResponse<T>> => {
      const { authToken, ...axiosConfig } = config;
      return axios.get<T>(`${API_BASE_URL}${endpoint}`, {
        ...axiosConfig,
        headers: {
          ...(axiosConfig.headers || {}),
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
      });
    },
    []
  );

  const apiPost = useCallback(
    <T = unknown>(
      endpoint: string,
      data?: unknown,
      config: ApiRequestConfig = {}
    ): Promise<AxiosResponse<T>> => {
      const { authToken, ...axiosConfig } = config;
      return axios.post<T>(`${API_BASE_URL}${endpoint}`, data, {
        ...axiosConfig,
        headers: {
          ...(axiosConfig.headers || {}),
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
      });
    },
    []
  );

  return { apiGet, apiPost };
}
