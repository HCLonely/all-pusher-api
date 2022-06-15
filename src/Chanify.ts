import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions, queryStringify } from './tool';

interface ChanifyConfig {
  key?: {
    token: string
    baseURL?: string
  }
  baseURL?: string
  token?: string
  proxy?: proxy
}
interface ChanifyOptions {
  title: string
  text: string
  [name: string]: any
}

class Chanify {
  protected _KEY: string;
  #baseURL = 'https://api.chanify.net/v1/sender/';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, baseURL, key, proxy }: ChanifyConfig) {
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
    let chanifyOptions: ChanifyOptions;
    if (sendOptions.customOptions) {
      chanifyOptions = sendOptions.customOptions;
    } else {
      chanifyOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        text: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      chanifyOptions = {
        ...chanifyOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: `${this.#baseURL}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: queryStringify(chanifyOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.status === 200) {
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
    }).catch((error) => ({
      status: 102,
      statusText: 'Request Error',
      extraMessage: error
    }));
  }
}

export { Chanify };
