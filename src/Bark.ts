import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface BarkConfig {
  key?: {
    token: string
    baseURL?: string
  }
  baseURL?: string
  token?: string
  proxy?: proxy
}
interface BarkOptions {
  device_key?: string
  title: string
  body: string
  [name: string]: any
}

class Bark {
  protected _KEY: string;
  #baseURL = 'https://api.day.app/push';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, baseURL, key, proxy }: BarkConfig) {
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
    let barkOptions: BarkOptions;
    if (sendOptions.customOptions) {
      barkOptions = sendOptions.customOptions;
    } else {
      barkOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        body: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      barkOptions = {
        ...barkOptions,
        ...sendOptions.extraOptions
      };
    }
    if (!barkOptions.device_key) {
      barkOptions.device_key = this._KEY;
    }

    const axiosOptions: AxiosRequestConfig = {
      url: this.#baseURL,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: barkOptions
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

export { Bark };
