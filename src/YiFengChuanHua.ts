import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface YiFengChuanHuaConfig {
  key?: {
    token: string
  }
  token?: string
  proxy?: proxy
}
interface YiFengChuanHuaOptions {
  head: string
  body: string
  [name: string]: any
}

class YiFengChuanHua {
  protected _KEY: string;
  readonly baseURL = 'https://www.phprm.com/services/push/send/';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, key, proxy }: YiFengChuanHuaConfig) {
    const $key = {
      token,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if (proxy && proxy.enable) {
      this.httpsAgent = proxy2httpsAgent(proxy);
    }
  }

  async send(sendOptions: sendOptions): Promise<result> {
    if (!sendOptions.message && !sendOptions.customOptions) {
      return {
        status: 0,
        statusText: 'Missing Parameter: message',
        extraMessage: null
      };
    }
    let yiFengChuanHuaOptions: YiFengChuanHuaOptions;
    if (sendOptions.customOptions) {
      yiFengChuanHuaOptions = sendOptions.customOptions;
    } else {
      yiFengChuanHuaOptions = {
        head: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        body: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      yiFengChuanHuaOptions = {
        ...yiFengChuanHuaOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: `${this.baseURL}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: yiFengChuanHuaOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data.code === 0) {
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

export { YiFengChuanHua };
