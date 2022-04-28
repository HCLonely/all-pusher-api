/* global sendOptions, FeiShuOptions, result FeiShuConfig */
import axios, { AxiosRequestConfig } from 'axios';
import { createHmac } from 'crypto';
import { proxy2httpsAgent } from './tool';

interface signParam {
  timestamp: number
  sign: string
}

class FeiShu {
  protected _KEY: string;
  protected _SECRET?: string;
  readonly baseURL = 'https://open.feishu.cn/open-apis/bot/v2/hook/';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, key, proxy }: FeiShuConfig) {
    if (!token && !key?.token) {
      throw new Error('Missing Parameter: key.token');
    }
    // @ts-ignore
    this._KEY = token || key.token;
    if (key?.secret) {
      this._SECRET = key.secret;
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
    let feiShuOptions: FeiShuOptions;
    if (sendOptions.customOptions) {
      feiShuOptions = sendOptions.customOptions;
    } else {
      if (!sendOptions.type || sendOptions.type === 'text') {
        feiShuOptions = {
          msg_type: 'text',
          content: {
            text: sendOptions.message
          }
        };
      } else {
        return {
          status: 103,
          statusText: 'Options Format Error',
          extraMessage: sendOptions
        };
      }
    }

    if (this._SECRET) {
      feiShuOptions = {
        ...this.#sign(),
        ...feiShuOptions
      };
    }
    if (sendOptions.extraOptions) {
      feiShuOptions = {
        ...feiShuOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions: AxiosRequestConfig = {
      url: `${this.baseURL}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: feiShuOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (!response.data.code) {
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
    return this.send({ message: '测试内容', type: 'text' });
  }

  #sign(): signParam {
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const stringToSign = `${timestamp}\n${this._SECRET}`;
    const hash = createHmac('sha256', stringToSign)
      .digest();
    return {
      timestamp,
      sign: hash.toString('base64')
    };
  }
}

export { FeiShu };
