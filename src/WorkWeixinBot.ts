import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface WorkWeixinBotConfig {
  key?: {
    webhook: string
  }
  webhook?: string
  proxy?: proxy
}
interface WorkWeixinBotOptions {
  msgtype: string
  text?: any
  markdown?: any
  [name: string]: any
}

class WorkWeixinBot {
  protected _WEBHOOK: string;
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ webhook, key, proxy }: WorkWeixinBotConfig) {
    const $key = {
      webhook,
      ...key
    };
    if (!$key.webhook) {
      throw new Error('Missing Parameter: webhook');
    }
    this._WEBHOOK = $key.webhook;
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
    let workWeixinOptions: WorkWeixinBotOptions;
    if (sendOptions.customOptions) {
      workWeixinOptions = sendOptions.customOptions;
    } else {
      if (!sendOptions.type || sendOptions.type === 'text') {
        workWeixinOptions = {
          msgtype: 'text',
          text: {
            content: sendOptions.message
          }
        };
      } else if (sendOptions.type === 'markdown') {
        workWeixinOptions = {
          msgtype: 'markdown',
          markdown: {
            content: sendOptions.message
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
      workWeixinOptions = {
        ...workWeixinOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions: AxiosRequestConfig = {
      url: this._WEBHOOK,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: workWeixinOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
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
}

export { WorkWeixinBot };
