import axios, { AxiosRequestConfig } from 'axios';
import { queryStringify, proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface ShowdocConfig {
  token?: string
  key?: {
    token: string
  }
  proxy?: proxy
}
interface ShowdocOptions {
  title: string
  content: string
  [name: string]: any
}

class Showdoc {
  protected _KEY: string;
  readonly baseURL = 'https://push.showdoc.com.cn/server/api/push/';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, key, proxy }: ShowdocConfig) {
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
    let showdocOptions: ShowdocOptions;
    if (sendOptions.customOptions) {
      showdocOptions = sendOptions.customOptions;
    } else {
      showdocOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        content: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      showdocOptions = {
        ...showdocOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: `${this.baseURL}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: queryStringify(showdocOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (!response.data.error_code) {
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

export { Showdoc };
