import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface NtfyConfig {
  key?: {
    token: string
    baseURL?: string
  }
  token?: string
  baseURL?: string
  proxy?: proxy
}
interface NtfyOptions {
  topic: string
  title: string
  message: string
  [name: string]: any
}

class Ntfy {
  protected _KEY: string;
  #baseURL = 'https://ntfy.sh/';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, baseURL, key, proxy }: NtfyConfig) {
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
    let ntfyOptions: NtfyOptions;
    if (sendOptions.customOptions) {
      ntfyOptions = sendOptions.customOptions;
    } else {
      ntfyOptions = {
        topic: this._KEY,
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        message: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      ntfyOptions = {
        ...ntfyOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: `${this.#baseURL}`,
      method: 'POST',
      data: JSON.stringify(ntfyOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data.topic === this._KEY) {
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

export { Ntfy };
