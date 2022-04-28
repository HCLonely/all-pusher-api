/* global sendOptions,TelegramBotOptions, result, TelegramBotConfig */
import axios, { AxiosRequestConfig } from 'axios';
import { queryStringify, proxy2httpsAgent } from './tool';

class TelegramBot {
  protected _KEY: string;
  protected _CHAT_ID: string;
  readonly baseURL = 'https://api.telegram.org/bot';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, chat_id, key, proxy }: TelegramBotConfig) {
    if (!token && !key?.token) {
      throw new Error('Missing Parameter: token');
    }
    if (!chat_id && !key?.chat_id) {
      throw new Error('Missing Parameter: chat_id');
    }

    // @ts-ignore
    this._KEY = token || key.token;
    // @ts-ignore
    this._CHAT_ID = chat_id || key.chat_id;

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
    let telegramBotOptions: TelegramBotOptions;
    if (sendOptions.customOptions) {
      telegramBotOptions = sendOptions.customOptions;
    } else {
      telegramBotOptions = {
        text: sendOptions.message
      };
      if (sendOptions.type === 'html') {
        telegramBotOptions.parse_mode = 'HTML';
      }
      if (sendOptions.type === 'markdown') {
        telegramBotOptions.parse_mode = 'Markdown';
      }
    }
    if (!telegramBotOptions.chat_id) {
      telegramBotOptions.chat_id = this._CHAT_ID;
    }
    if (sendOptions.extraOptions) {
      telegramBotOptions = {
        ...telegramBotOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: `${this.baseURL}${this._KEY}/sendMessage`,
      method: 'POST',
      data: queryStringify(telegramBotOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data.ok) {
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
    return this.send({ message: '测试内容' });
  }
}

export { TelegramBot };
