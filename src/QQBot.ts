import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface QQBotConfig {
  key?: {
    appId: string
    appSecret: string
    userId?: string
    groupId?: string
    channelId?: string
    guildId?: string
    baseUrl?: string
  }
  appId?: string
  appSecret?: string
  userId?: string
  groupId?: string
  channelId?: string
  guildId?: string
  baseUrl?: string
  proxy?: proxy
}

interface QQBotOptions {
  msg_type?: number
  content?: string
  markdown?: any
  userId?: string
  groupId?: string
  channelId?: string
  guildId?: string
  [name: string]: any
}

class QQBot {
  protected _APP_ID: string;
  protected _CLIENT_SECRET: string;
  protected _TOKEN?: string;
  protected _TOKEN_EXPIRE_AT = 0;
  readonly tokenURL = 'https://api.bot.qq.com/app/getAppAccessToken';
  readonly baseUrl: string;
  httpsAgent?: AxiosRequestConfig['httpsAgent'];
  userId?: string;
  groupId?: string;
  channelId?: string;
  guildId?: string;

  constructor({ appId, appSecret, userId, groupId, channelId, baseUrl, key, proxy }: QQBotConfig) {
    const $key = {
      appId,
      appSecret,
      userId,
      groupId,
      channelId,
      // guildId,
      baseUrl,
      ...key
    };
    if (!$key.appId) {
      throw new Error('Missing Parameter: appId');
    }
    if (!$key.appSecret) {
      throw new Error('Missing Parameter: appSecret');
    }

    this._APP_ID = $key.appId;
    this._CLIENT_SECRET = $key.appSecret;
    this.baseUrl = $key.baseUrl || 'https://api.bot.qq.com';
    this.userId = $key.userId;
    this.groupId = $key.groupId;
    this.channelId = $key.channelId;
    this.guildId = $key.guildId;

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

    let qqBotOptions: QQBotOptions;
    if (sendOptions.customOptions) {
      qqBotOptions = sendOptions.customOptions;
    } else if (!sendOptions.type || sendOptions.type === 'text') {
      qqBotOptions = {
        msg_type: 0,
        content: sendOptions.message
      };
    } else if (sendOptions.type === 'markdown') {
      qqBotOptions = {
        msg_type: 2,
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

    if (sendOptions.extraOptions) {
      qqBotOptions = {
        ...qqBotOptions,
        ...sendOptions.extraOptions
      };
    }

    const userId = qqBotOptions.userId || this.userId;
    const groupId = qqBotOptions.groupId || this.groupId;
    const channelId = qqBotOptions.channelId || this.channelId;
    // const guildId = qqBotOptions.guildId || this.guildId;
    if (!userId && !groupId && !channelId) {
      return {
        status: 0,
        statusText: 'Missing Parameter: userId or groupId or channelId',
        extraMessage: null
      };
    }

    if (!this._TOKEN || Date.now() >= this._TOKEN_EXPIRE_AT) {
      const tokenResult = await this.#getToken();
      if (tokenResult.status !== 200) {
        return tokenResult;
      }
    }

    let messageURL = `${this.baseUrl}/channels/${channelId}/messages`;
    // if (channelId) {
    //   messageURL = `${this.baseUrl}/channels/${channelId}/messages`;
    // }
    if (groupId) {
      messageURL = `${this.baseUrl}/v2/groups/${groupId}/messages`;
    }
    if (userId) {
      messageURL = `${this.baseUrl}/v2/users/${userId}/messages`;
    }

    const axiosOptions: AxiosRequestConfig = {
      url: messageURL,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `QQBot ${this._TOKEN}`
      },
      data: qqBotOptions
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
        if (response.data.code === 304023) {
          return {
            status: 201,
            statusText: 'Waiting',
            extraMessage: response
          };
        }
        return {
          status: 100,
          statusText: this.#errorText('Error', response.data),
          extraMessage: response
        };
      }
      return {
        status: 101,
        statusText: 'No Response Data',
        extraMessage: response
      };
    }).catch((error) => {
      if (error?.response?.data?.code === 304023) {
        return {
          status: 201,
          statusText: 'Waiting',
          extraMessage: error
        };
      }
      return {
        status: 102,
        statusText: this.#errorText('Request Error', error?.response?.data),
        extraMessage: error
      };
    });
  }

  async #getToken(): Promise<result> {
    const axiosOptions: AxiosRequestConfig = {
      url: this.tokenURL,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: {
        appId: this._APP_ID,
        clientSecret: this._CLIENT_SECRET
      }
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    return axios(axiosOptions).then((response) => {
      if (response.data?.access_token) {
        this._TOKEN = response.data.access_token;
        const expiresIn = Number(response.data.expires_in) || 7200;
        this._TOKEN_EXPIRE_AT = Date.now() + (Math.max(expiresIn - 60, 1) * 1000);
        return {
          status: 200,
          statusText: 'Success',
          extraMessage: response
        };
      }
      return {
        status: 104,
        statusText: this.#errorText('Get "access_token" Failed', response.data),
        extraMessage: response
      };
    }).catch((error) => ({
      status: 104,
      statusText: this.#errorText('Get "access_token" Failed', error?.response?.data),
      extraMessage: error
    }));
  }

  #errorText(prefix: string, data: any): string {
    if (!data || typeof data !== 'object') return prefix;
    const details = [
      data.code !== undefined ? `code=${data.code}` : '',
      data.err_code !== undefined ? `err_code=${data.err_code}` : '',
      typeof data.message === 'string' ? data.message : ''
    ].filter(Boolean);
    return details.length ? `${prefix}: ${details.join(', ')}` : prefix;
  }
}

export { QQBot };
