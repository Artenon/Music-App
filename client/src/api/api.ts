import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { toast } from 'react-toastify';
import { DefaultResponse } from "../types/server.types";
import { toastifyOptions } from "../const";
import { getToken } from "../service/user-storage";

const BASE_URL = '/api';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();
    
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  });

  api.interceptors.response.use(
    response => response,
    (error: AxiosError<DefaultResponse>) => {
      if (error.response) {
        if (error.response.data.message !== 'Unauthorized') {
          toast.error(error.response.data.message, toastifyOptions);
          throw error;
        }
      }
    }
  );

  return api;
};
