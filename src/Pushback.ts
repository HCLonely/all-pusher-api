import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface PushbackConfig {
  key?: {
    token: string
    userId: string
  }
  token?: string
  userId?: string
  proxy?: proxy
}
interface PushbackOptions {
  title: string
  body: string
  [name: string]: any
}

class Pushback {
  protected _KEY: string;
  protected _USER_ID: string;
  protected _BASE_URL = 'https://api.pushback.io/v1/send';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, userId, key, proxy }: PushbackConfig) {
    const $key = {
      token,
      userId,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    if (!$key.userId) {
      throw new Error('Missing Parameter: userId');
    }
    this._KEY = $key.token;
    this._USER_ID = $key.userId;
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
    let pushbackOptions: PushbackOptions;
    if (sendOptions.customOptions) {
      pushbackOptions = sendOptions.customOptions;
    } else {
      pushbackOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        body: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      pushbackOptions = {
        ...pushbackOptions,
        ...sendOptions.extraOptions
      };
    }
    if (!pushbackOptions.id) {
      pushbackOptions.id = this._USER_ID;
    }
    const axiosOptions: AxiosRequestConfig = {
      url: this._BASE_URL,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this._KEY}`
      },
      data: pushbackOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (![null, undefined, ''].includes(response.data)) {
        if (response.data === 0) {
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

export { Pushback };
