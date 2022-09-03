import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface PushPlusConfig {
  token?: string
  key?: {
    token: string
  }
  proxy?: proxy
}
interface PushPlusOptions {
  title?: string
  content: string
  topic?: string
  template?: string
  [name: string]: any
}

class PushPlus {
  protected _KEY: string;
  readonly baseURL = 'http://www.pushplus.plus/send';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, key, proxy }: PushPlusConfig) {
    const $key = {
      token,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if (proxy) {
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
    let pushPlusOptions: PushPlusOptions;
    if (sendOptions.customOptions) {
      pushPlusOptions = sendOptions.customOptions;
    } else {
      pushPlusOptions = {
        content: sendOptions.message
      };
      if (sendOptions.title) {
        pushPlusOptions.title = sendOptions.title;
      }
      if (['html', 'markdown'].includes(sendOptions.type || '')) {
        pushPlusOptions.template = sendOptions.type;
      }
    }
    pushPlusOptions.token = this._KEY;
    if (sendOptions.extraOptions) {
      pushPlusOptions = {
        ...pushPlusOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: `${this.baseURL}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: pushPlusOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data.code === 200) {
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

export { PushPlus };
