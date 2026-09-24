import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface NotifyXConfig {
  token?: string
  key?: {
    token: string
  }
  proxy?: proxy
}

interface NotifyXOptions {
  title: string
  content: string
  description?: string
  team?: string
  [name: string]: any
}

class NotifyX {
  protected _KEY: string;
  readonly baseURL = 'https://www.notifyx.cn/api/v1/send/';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, key, proxy }: NotifyXConfig) {
    const $key = { token, ...key };
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
    const notifyXOptions: NotifyXOptions = {
      ...(sendOptions.customOptions || {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        content: sendOptions.message
      }),
      ...sendOptions.extraOptions
    };
    const axiosOptions: AxiosRequestConfig = {
      url: `${this.baseURL}${encodeURIComponent(this._KEY)}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: notifyXOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data.status === 'queued') {
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

export { NotifyX };
