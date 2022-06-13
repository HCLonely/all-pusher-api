import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { queryStringify, proxy2httpsAgent, proxy, result } from './tool';

interface CustomConfig {
  url: string,
  method?: string,
  contentType?: string,
  headers?: AxiosRequestHeaders,
  success: {
    key: string,
    value: any
  },
  key?: {
    url: string,
    method?: string,
    contentType?: string,
    headers?: AxiosRequestHeaders,
    success: {
      key: string,
      value: any
    }
  },
  proxy?: proxy
}

class Custom {
  protected _URL: string;
  httpsAgent?: AxiosRequestConfig['httpsAgent'];
  method = 'POST';
  contentType = 'application/json';
  protected _HEADERS?: AxiosRequestHeaders;
  success: {
    key: string
    value: any
  };

  constructor({ url, method, contentType, headers, success, key, proxy }: CustomConfig) {
    const $key = {
      url, method, contentType, headers, success,
      ...key
    };
    if (!$key.url) {
      throw new Error('Missing Parameter: url');
    }
    if (!$key.success) {
      throw new Error('Missing Parameter: success');
    }
    this._URL = $key.url;
    this.success = $key.success;
    if ($key.method) {
      this.method = $key.method;
    }
    if ($key.contentType) {
      this.contentType = $key.contentType;
    }
    if ($key.headers) {
      this._HEADERS = $key.headers;
    }
    if (proxy) {
      this.httpsAgent = proxy2httpsAgent(proxy);
    }
  }

  async send(sendOptions: any): Promise<result> {
    const axiosOptions: AxiosRequestConfig = {
      url: this._URL,
      method: this.method,
      headers: {
        'Content-type': 'application/json'
      },
      data: sendOptions.extraMessage || sendOptions
    };
    if (this._HEADERS) {
      axiosOptions.headers = this._HEADERS;
    }
    if (this.contentType) {
      (axiosOptions.headers as AxiosRequestHeaders)['Content-type'] = this.contentType;
    }
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    if (axiosOptions.method?.toUpperCase() === 'POST' &&
      (axiosOptions.headers as AxiosRequestHeaders)['Content-type'] === 'application/x-www-form-urlencoded') {
      axiosOptions.data = queryStringify(sendOptions);
    }
    if (axiosOptions.method?.toUpperCase() === 'GET') {
      axiosOptions.data = null;
      axiosOptions.url += queryStringify(sendOptions);
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        let variate = response.data;
        this.success.key.split('.').forEach((key, index) => {
          if (index === 0) {
            return;
          }
          variate = variate?.[key];
        });

        if (variate === this.success.value) {
          return {
            status: 200,
            statusText: 'Success',
            extraMessage: response
          };
        }
        return {
          status: 100,
          statusText: 'Error',
          extraMessage: response
        };
      }
      return {
        status: 101,
        statusText: 'No Response Data',
        extraMessage: response
      };
    }).catch((error) => ({
      status: 102,
      statusText: 'Request Error',
      extraMessage: error
    }));
  }
}

export { Custom };
