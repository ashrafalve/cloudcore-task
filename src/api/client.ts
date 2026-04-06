import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../constants/config';

const createAxiosClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          console.log('Unauthorized request');
        } else if (status === 404) {
          console.log('Resource not found');
        } else if (status >= 500) {
          console.log('Server error');
        }
      } else if (error.request) {
        console.log('Network error - no response received');
      } else {
        console.log('Error setting up request');
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export const axiosClient = createAxiosClient();

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
    if (axiosError.response?.status === 401) {
      return 'Invalid credentials. Please check your phone and password.';
    }
    if (axiosError.response?.status === 422) {
      return 'Validation error. Please check your input.';
    }
    if (axiosError.response?.status === 500) {
      return 'Server error. Please try again later.';
    }
    if (axiosError.code === 'ECONNABORTED') {
      return 'Request timeout. Please try again.';
    }
    if (!axiosError.response) {
      return 'Network error. Please check your connection.';
    }
    return 'An unexpected error occurred.';
  }
  return 'An unexpected error occurred.';
};