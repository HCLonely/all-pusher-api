import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface GoogleChatConfig {
  key?: {
    webhook: string
  }
  webhook?: string
  proxy?: proxy
}
interface GoogleChatOptions {
  text: string
  [name: string]: any
}

class GoogleChat {
  protected _WEBHOOK: string;
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ webhook, key, proxy }: GoogleChatConfig) {
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
    let googleChatOptions: GoogleChatOptions;
    if (sendOptions.customOptions) {
      googleChatOptions = sendOptions.customOptions;
    } else {
      googleChatOptions = {
        text: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      googleChatOptions = {
        ...googleChatOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions: AxiosRequestConfig = {
      url: this._WEBHOOK,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: googleChatOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (!response.data.error) {
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

export { GoogleChat };
