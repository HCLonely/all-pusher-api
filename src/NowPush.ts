import axios, { AxiosRequestConfig } from 'axios';
import { queryStringify, proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface NowPushConfig {
  key?: {
    token: string
  }
  token?: string
  proxy?: proxy
}
interface NowPushOptions {
  message_type: string
  note: string
  device_type?: string
  [name: string]: any
}

class NowPush {
  protected _KEY: string;
  readonly baseURL = 'https://www.api.nowpush.app/v3/sendMessage';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, key, proxy }: NowPushConfig) {
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
    let nowPushOptions: NowPushOptions;
    if (sendOptions.customOptions) {
      nowPushOptions = sendOptions.customOptions;
    } else {
      nowPushOptions = {
        message_type: 'nowpush_note',
        note: sendOptions.message
      };
    }
    nowPushOptions.device_type = 'api';
    if (sendOptions.extraOptions) {
      nowPushOptions = {
        ...nowPushOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: this.baseURL,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${this._KEY}`
      },
      data: queryStringify(nowPushOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data.isError === false) {
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

export { NowPush };
