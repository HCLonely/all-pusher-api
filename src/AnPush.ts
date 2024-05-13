import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface AnPushConfig {
  key?: {
    token: string
    channel?: string
  }
  token?: string
  channel?: string
  proxy?: proxy
}
interface AnPushOptions {
  channel: string
  content: string
  title?: string
  [name: string]: any
}

class AnPush {
  protected _KEY: string;
  readonly baseURL = 'https://api.anpush.com/push/';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];
  channel!: string;

  constructor({ token, key, channel, proxy }: AnPushConfig) {
    const $key = {
      token,
      channel,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    if ($key.channel) {
      this.channel = $key.channel;
    }
    this._KEY = $key.token;
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
    let anPushOptions: AnPushOptions;
    if (sendOptions.customOptions) {
      anPushOptions = sendOptions.customOptions;
    } else {
      anPushOptions = {
        channel: this.channel,
        content: sendOptions.message,
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10)
      };
    }

    if (sendOptions.extraOptions) {
      anPushOptions = {
        ...anPushOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: `${this.baseURL}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: anPushOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data.code === 200) {
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

export { AnPush };
