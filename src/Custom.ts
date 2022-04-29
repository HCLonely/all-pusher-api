/* global result, CustomConfig */
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { queryStringify, proxy2httpsAgent } from './tool';

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

  constructor({ url, method, contentType, headers, key, success, proxy }: CustomConfig) {
    if (!url && !key?.url) {
      throw new Error('Missing Parameter: url');
    }
    if (!success && !key?.success) {
      throw new Error('Missing Parameter: success');
    }
    // @ts-ignore
    this._URL = url || key.url;
    // @ts-ignore
    this.success = success || key.success;
    if (method || key?.method) {
      // @ts-ignore
      this.method = method || key.method;
    }
    if (contentType || key?.contentType) {
      // @ts-ignore
      this.contentType = contentType || key.contentType;
    }
    if (headers || key?.headers) {
      // @ts-ignore
      this._HEADERS = headers || key.headers;
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
