import axios, { AxiosRequestConfig } from 'axios';
import { createHmac } from 'crypto';
import { queryStringify, proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface DingTalkConfig {
  token?: string
  secret?: string
  key?: {
    token: string
    secret?: string
  },
  proxy?: proxy
}
interface DingTalkOptions {
  msgtype?: string
  content?: string
  title?: string
  messageUrl?: string
  text?: any
  markdown?: any
  [name: string]: any
}

interface signParam {
  timestamp: number
  sign: string
}

class DingTalk {
  protected _KEY: string;
  protected _SECRET?: string;
  readonly baseURL = 'https://oapi.dingtalk.com/robot/send';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, secret, key, proxy }: DingTalkConfig) {
    const $key = {
      token, secret,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if ($key.secret) {
      this._SECRET = $key.secret;
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
    let dingTalkOptions: DingTalkOptions;
    if (sendOptions.customOptions) {
      dingTalkOptions = sendOptions.customOptions;
    } else {
      if (!sendOptions.type || sendOptions.type === 'text') {
        dingTalkOptions = {
          msgtype: 'text',
          text: {
            content: sendOptions.message
          }
        };
      } else if (sendOptions.type === 'markdown') {
        dingTalkOptions = {
          msgtype: 'markdown',
          markdown: {
            text: sendOptions.message,
            title: sendOptions.title || sendOptions.message.split('\n')[0].trim()
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
    if (sendOptions.extraOptions) {
      dingTalkOptions = {
        ...dingTalkOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: `${this.baseURL}?access_token=${this._KEY}${this._SECRET ? `&${queryStringify(this.#sign())}` : ''}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: dingTalkOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        console.log(response.data.errcode);

        if (!response.data.errcode) {
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

  #sign(): signParam {
    const timestamp = new Date().getTime();
    const stringToSign = `${timestamp}\n${this._SECRET}`;
    const hash = createHmac('sha256', this._SECRET as string)
      .update(stringToSign, 'utf8')
      .digest();
    return {
      timestamp,
      sign: encodeURIComponent(hash.toString('base64'))
    };
  }
}

export { DingTalk };
