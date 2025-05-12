import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface PushMeConfig {
  key?: {
    token: string
    baseURL?: string
  }
  token?: string
  baseURL?: string
  proxy?: proxy
}
interface PushMeOptions {
  title?: string
  content: string
  topic?: string
  template?: string
  [name: string]: any
}

class PushMe {
  protected _KEY: string;
  #baseURL = 'https://push.i-i.me';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, baseURL, key, proxy }: PushMeConfig) {
    const $key = {
      token,
      baseURL,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if ($key.baseURL) {
      this.#baseURL = $key.baseURL;
    }
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
    let pushMeOptions: PushMeOptions;
    if (sendOptions.customOptions) {
      pushMeOptions = sendOptions.customOptions;
    } else {
      pushMeOptions = {
        content: sendOptions.message
      };
      if (sendOptions.title) {
        pushMeOptions.title = sendOptions.title;
      }
      if (['html', 'markdown'].includes(sendOptions.type || '')) {
        pushMeOptions.type = sendOptions.type;
      }
    }
    pushMeOptions.push_key = this._KEY;
    if (sendOptions.extraOptions) {
      pushMeOptions = {
        ...pushMeOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: `${this.#baseURL}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: pushMeOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data === 'success') {
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

export { PushMe };
