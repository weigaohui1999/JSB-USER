import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

/**
 * @description ajax res基础返回体
 * @export
 * @interface BaseResponse
 * @template T
 */
export interface BaseResponse<T = any> {
  code: number;
  data: T;
  msg?: string;
  [x: string]: any;
}

class HttpClient {
  public service: AxiosInstance;
  constructor(options: AxiosRequestConfig) {
    this.service = axios.create({
      ...options,
    });
    this.interceptors();
  }
  public interceptors() {
    this.service.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.service.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  public request<T = any>(options: AxiosRequestConfig) {
    return this.service.request<any, T>(options);
  }

  get<T = any>(url: string, data?: any, config: AxiosRequestConfig = {}) {
    return this.request<T>({
      url,
      method: "get",
      params: data,
      ...config,
    });
  }

  post<T = any>(url: string, data?: any, config: AxiosRequestConfig = {}) {
    return this.request<T>({
      url,
      method: "post",
      data,
      ...config,
    });
  }

  put<T = any>(url: string, data?: any, config: AxiosRequestConfig = {}) {
    return this.request<T>({
      url,
      method: "put",
      data,
      ...config,
    });
  }

  delete<T = any>(url: string, data?: any, config: AxiosRequestConfig = {}) {
    return this.request<T>({
      url,
      method: "delete",
      params: data,
      ...config,
    });
  }
}

const Http = new HttpClient({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 1000 * 60,
});

export default Http;
