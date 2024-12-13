/* import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

const MAX_RETRY_ATTEMPTS = 3;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

interface APIResponse<T = unknown> {
  status: number;
  data: T;
}

interface FileUploadResponse {
  success: boolean;
  message: string;
}

class BaseAPI {
  private static setAuthHeaders(headers: Record<string, string>): void {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  private async handleRequest<T>(config: AxiosRequestConfig): Promise<APIResponse<T>> {
    try {
      const response = await axiosInstance.request<T>(config);
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          status: error.response.status,
          data: error.response.data || 'An error occurred',
        };
      }
      return {
        status: 500,
        data: 'Unexpected error',
      };
    }
  }

  async request<T = unknown>(
    url: string,
    method: AxiosRequestConfig['method'],
    body?: unknown,
    params?: unknown,
  ): Promise<APIResponse<T>> {
    const headers: Record<string, string> = {};
    BaseAPI.setAuthHeaders(headers);

    const config: AxiosRequestConfig = {
      url,
      method,
      data: body,
      params,
      headers,
    };

    return this.handleRequest<T>(config);
  }

  async uploadFile(
    url: string,
    file: File,
    additionalData?: Record<string, unknown>,
  ): Promise<APIResponse<FileUploadResponse>> {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    const headers: Record<string, string> = {
      'Content-Type': 'multipart/form-data',
    };
    BaseAPI.setAuthHeaders(headers);

    const config: AxiosRequestConfig = {
      url,
      method: 'POST',
      data: formData,
      headers,
      signal,
    };

    return this.handleRequest<FileUploadResponse>(config);
  }


}

export default BaseAPI;
 */