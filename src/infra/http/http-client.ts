import type { HttpClientMetods, PostParams, PutParams } from '@/domain/http/http-client';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';


export class HttpClient implements HttpClientMetods {
  constructor(private readonly axiosInstance: AxiosInstance) { }
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await this.axiosInstance.get<T>(url, config);
  }
  async post<Body, Response>({ body, url, config }: PostParams<Body>): Promise<AxiosResponse<Response>> {
    return await this.axiosInstance.post<Response>(url, body, config)
  }
  async put<Body, Response>({ body, url, config }: PutParams<Body>): Promise<AxiosResponse<Response>> {
    return await this.axiosInstance.put<Response>(url, body, config)
  }
  async patch<Body, Response>({ body, url, config }: PutParams<Body>): Promise<AxiosResponse<Response>> {
    return await this.axiosInstance.patch<Response>(url, body, config)
  }
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await this.axiosInstance.delete<T>(url, config);
  }
}
