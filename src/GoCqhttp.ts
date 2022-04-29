/* global sendOptions, GoCqhttpOptions, result, GoCqhttpConfig */
import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent } from './tool';

class GoCqhttp {
  protected _KEY?: string;
  protected _BASE_URL: string;
  httpsAgent?: AxiosRequestConfig['httpsAgent'];
  user_id?: number;
  group_id?: number;

  constructor({ baseUrl, token, user_id, group_id, key, proxy }: GoCqhttpConfig) {
    if (!baseUrl && !key?.baseUrl) {
      throw new Error('Missing Parameter: baseUrl');
    }
    // @ts-ignore
    this._BASE_URL = baseUrl || key.baseUrl;
    if (token || key?.token) {
      // @ts-ignore
      this._KEY = token || key.token;
    }
    if (user_id || key?.user_id) {
      // @ts-ignore
      this.user_id = user_id || key.user_id;
    }
    if (group_id || key?.group_id) {
      // @ts-ignore
      this.group_id = group_id || key.group_id;
    }
    if (proxy) {
      this.httpsAgent = proxy2httpsAgent(proxy, new URL(this._BASE_URL).protocol.replace(':', ''));
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
    let goCqhttpOptions: GoCqhttpOptions;
    if (sendOptions.customOptions) {
      goCqhttpOptions = sendOptions.customOptions;
    } else {
      goCqhttpOptions = {
        message: sendOptions.message
      };
      if (this.user_id) {
        goCqhttpOptions.user_id = this.user_id;
      }
      if (this.group_id) {
        goCqhttpOptions.group_id = this.group_id;
      }
    }
    if (sendOptions.extraOptions) {
      goCqhttpOptions = {
        ...goCqhttpOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: `${this._BASE_URL}/send_msg`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this._KEY}`
      },
      data: goCqhttpOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data.retcode === 0) {
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
  test(): Promise<result> {
    return this.send({ title: '测试标题', message: '测试内容', type: 'text' });
  }
}

export { GoCqhttp };
