import axios, { AxiosRequestConfig } from 'axios';
import { queryStringify, proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface TelegramBotConfig {
  key?: {
    token: string
    chat_id: string
  }
  token?: string
  chat_id?: string
  proxy?: proxy
}
interface TelegramBotOptions {
  chat_id?: string
  text?: string
  parse_mode?: string
  [name: string]: any
}

class TelegramBot {
  protected _KEY: string;
  protected _CHAT_ID: string;
  readonly baseURL = 'https://api.telegram.org/bot';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, chat_id, key, proxy }: TelegramBotConfig) {
    const $key = {
      token, chat_id,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    if (!$key.chat_id) {
      throw new Error('Missing Parameter: chat_id');
    }

    this._KEY = $key.token;
    this._CHAT_ID = $key.chat_id;

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
}

export { TelegramBot };
