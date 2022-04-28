/* global sendOptions, DiscordOptions, result, DiscordConfig */
import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent } from './tool';

class Discord {
  protected _WEBHOOK: string;
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ webhook, key, proxy }: DiscordConfig) {
    if (!webhook && !key?.webhook) {
      throw new Error('Missing Parameter: webhook');
    }
    // @ts-ignore
    this._WEBHOOK = webhook || key.webhook;
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
    let discordOptions: DiscordOptions;
    if (sendOptions.customOptions) {
      discordOptions = sendOptions.customOptions;
    } else {
      discordOptions = {
        content: sendOptions.title ? `${sendOptions.title}\n${sendOptions.message}` : sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      discordOptions = {
        ...discordOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: this._WEBHOOK,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: discordOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => ({
      status: 200,
      statusText: 'Success',
      extraMessage: response
    })).catch((error) => ({
      status: 102,
      statusText: 'Request Error',
      extraMessage: error
    }));
  }
  test(): Promise<result> {
    return this.send({ title: '测试标题', message: '测试内容', type: 'text' });
  }
}

export { Discord };
