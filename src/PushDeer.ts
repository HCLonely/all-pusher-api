import axios, { AxiosRequestConfig } from 'axios';
import { queryStringify, proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface PushDeerConfig {
  token?: string
  baseURL?: string
  key?: {
    token: string
    baseURL?: string
  }
  proxy?: proxy
}
interface PushDeerOptions {
  text?: string
  pushkey?: string
  desp?: string
  type?: string
  [name: string]: any
}

class PushDeer {
  protected _KEY: string;
  #baseURL = 'https://api2.pushdeer.com/message/push';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, key, proxy }: PushDeerConfig) {
    const $key = {
      token,
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
    let pushDeerOptions: PushDeerOptions;
    if (sendOptions.customOptions) {
      pushDeerOptions = sendOptions.customOptions;
    } else {
      pushDeerOptions = { };
      if (sendOptions.title) {
        pushDeerOptions.text = sendOptions.title;
        pushDeerOptions.desp = sendOptions.message;
      } else {
        pushDeerOptions.text = sendOptions.message;
      }
      if (sendOptions.type) {
        pushDeerOptions.type = sendOptions.type;
      }
    }
    pushDeerOptions.pushkey = this._KEY;
    if (sendOptions.extraOptions) {
      pushDeerOptions = {
        ...pushDeerOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: this.#baseURL,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: queryStringify(pushDeerOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data.success?.[0]?.success === 'ok' || response.data.code === 0) {
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

export { PushDeer };
