import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface SlackConfig {
  key?: {
    webhook: string
  }
  webhook?: string
  proxy?: proxy
}
interface SlackOptions {
  text: string
  [name: string]: any
}

class Slack {
  protected _WEBHOOK: string;
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ webhook, key, proxy }: SlackConfig) {
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
    let slackOptions: SlackOptions;
    if (sendOptions.customOptions) {
      slackOptions = sendOptions.customOptions;
    } else {
      slackOptions = {
        text: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      slackOptions = {
        ...slackOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions: AxiosRequestConfig = {
      url: this._WEBHOOK,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: slackOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data === 'ok') {
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

export { Slack };
