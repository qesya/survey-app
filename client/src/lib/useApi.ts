import { useCallback } from "react";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface ApiRequestConfig extends AxiosRequestConfig {
  authToken?: string;
}

export function useApi() {
  const apiGet = useCallback(<T = unknown>(
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
  }, []);

  const apiPost = useCallback(<T = unknown>(
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
  }, []);

  return { apiGet, apiPost };
}
