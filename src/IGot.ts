import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface IGotConfig {
  key?: {
    token: string
  }
  token?: string
  proxy?: proxy
}
interface IGotOptions {
  title: string
  content: string
  [name: string]: any
}

class IGot {
  protected _KEY: string;
  readonly baseURL = 'https://push.hellyw.com/';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, key, proxy }: IGotConfig) {
    if (!token && !key?.token) {
      throw new Error('Missing Parameter: token');
    }
    // @ts-ignore
    this._KEY = token || key.token;
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
    let iGotOptions: IGotOptions;
    if (sendOptions.customOptions) {
      iGotOptions = sendOptions.customOptions;
    } else {
      iGotOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        content: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      iGotOptions = {
        ...iGotOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: `${this.baseURL}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: iGotOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data.ret === 0) {
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

export { IGot };
