import { AxiosInstance } from 'axios';

export type RequestConfig = {
  headers?: Record<string, any>;
  params?: Record<string, any>;
  paramsSerializer?: (params: Record<string, any>) => string;
  transformResponse?: ((data: any) => any)[];
  cancelToken?: any;
}

export type HTTPResponse<T = any> = {
  data: T;
  headers?: Record<string, string>;
}

export interface IHTTPClient {
  get<T = any>(url: string, config?: RequestConfig): Promise<HTTPResponse<T>>;
  post<T = any>(url: string, data?: Record<string, unknown>, config?: RequestConfig): Promise<HTTPResponse<T>>;
  put<T = any>(url: string, data?: Record<string, unknown>, config?: RequestConfig): Promise<HTTPResponse<T>>;
  delete(url: string, config?: RequestConfig): Promise<HTTPResponse>;
  head(url: string, config?: RequestConfig): Promise<HTTPResponse>;
}

export class HTTPClient implements IHTTPClient {
  private axios: any;

  constructor(axios: any) {
    this.axios = axios;
  }

  get(url: string, config?: RequestConfig): Promise<HTTPResponse> {
    return this.axios.get(url, config);
  }

  post(url: string, data: Record<string, unknown>, config?: RequestConfig): Promise<HTTPResponse> {
    return this.axios.post(url, data, config);
  }

  put(url: string, data: Record<string, unknown>, config?: RequestConfig): Promise<HTTPResponse> {
    return this.axios.put(url, data, config);
  }

  delete(url: string, config?: RequestConfig): Promise<HTTPResponse> {
    return this.axios.delete(url, config);
  }

  head(url: string, config?: RequestConfig): Promise<HTTPResponse> {
    return this.axios.head(url, config);
  }

  setAdditionalHeader = (headerName: string, headerValue: string) => {
    (this.axios as AxiosInstance).defaults.headers[headerName] = headerValue;
  };
}
