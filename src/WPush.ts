import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface WPushConfig {
  token?: string
  key?: {
    token: string
  }
  proxy?: proxy
}
interface WPushOptions {
  title?: string
  content: string
  topic?: string
  template?: string
  [name: string]: any
}

class WPush {
  protected _KEY: string;
  readonly baseURL = 'https://api.wpush.cn/api/v1/send';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, key, proxy }: WPushConfig) {
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
    let wPushOptions: WPushOptions;
    if (sendOptions.customOptions) {
      wPushOptions = sendOptions.customOptions;
    } else {
      wPushOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        content: sendOptions.message
      };
    }
    wPushOptions.apikey = this._KEY;
    if (sendOptions.extraOptions) {
      wPushOptions = {
        ...wPushOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: `${this.baseURL}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: wPushOptions
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

export { WPush };
