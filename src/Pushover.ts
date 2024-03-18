import axios, { AxiosRequestConfig } from 'axios';
import { queryStringify, proxy2httpsAgent, proxy, result, sendOptions } from './tool';
import showdown from 'showdown';

interface PushoverConfig {
  key?: {
    token: string
    user: string
  }
  user?: string
  token?: string
  proxy?: proxy
}
interface PushoverOptions {
  token: string
  user: string
  title?: string
  message: string
  [name: string]: any
}

class Pushover {
  protected _KEY: string;
  readonly baseURL = 'https://api.pushover.net/1/messages.json';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];
  protected _USER: string;

  constructor({ token, user, key, proxy }: PushoverConfig) {
    const $key = {
      token,
      user,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    if (!$key.user) {
      throw new Error('Missing Parameter: user');
    }
    this._KEY = $key.token;
    this._USER = $key.user;
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
    let pushoverOptions: PushoverOptions = {
      token: this._KEY,
      user: this._USER,
      message: ''
    };
    if (sendOptions.customOptions) {
      pushoverOptions = {
        ...pushoverOptions, ...sendOptions.customOptions
      };
    } else {
      pushoverOptions = {
        ...pushoverOptions,
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        message: sendOptions.message
      };
      if (['html', 'markdown'].includes(sendOptions.type || '')) {
        pushoverOptions.html = 1;
      }
      if (sendOptions.type === 'markdown') {
        // @ts-ignore
        pushoverOptions.message = new showdown().Converter().makeHtml(sendOptions.message);
      }
    }
    if (sendOptions.extraOptions) {
      pushoverOptions = {
        ...pushoverOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: this.baseURL,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: queryStringify(pushoverOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data.status === 1) {
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

export { Pushover };
