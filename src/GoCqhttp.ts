import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface GoCqhttpConfig {
  baseUrl?: string
  token?: string
  user_id?: number
  group_id?: number
  guild_id?: string
  channel_id?: string
  key: {
    baseUrl?: string
    token?: string
    user_id?: number
    group_id?: number
    guild_id?: string
    channel_id?: string
  }
  proxy?: proxy
}
interface GoCqhttpOptions {
  message: string
  user_id?: number
  group_id?: number
  guild_id?: string
  channel_id?: string
}

class GoCqhttp {
  protected _KEY?: string;
  protected _BASE_URL: string;
  httpsAgent?: AxiosRequestConfig['httpsAgent'];
  user_id?: number;
  group_id?: number;
  guild_id?: string;
  channel_id?: string;

  constructor({ baseUrl, token, user_id, group_id, guild_id, channel_id, key, proxy }: GoCqhttpConfig) {
    const $key = {
      baseUrl, token, user_id, group_id, guild_id, channel_id,
      ...key
    };
    if (!$key.baseUrl) {
      throw new Error('Missing Parameter: baseUrl');
    }
    this._BASE_URL = $key.baseUrl;
    if ($key.token) {
      this._KEY = $key.token;
    }
    if ($key.user_id) {
      this.user_id = $key.user_id;
    }
    if ($key.group_id) {
      this.group_id = $key.group_id;
    }
    if ($key.group_id) {
      this.group_id = $key.group_id;
    }
    if ($key.channel_id) {
      this.channel_id = $key.channel_id;
    }
    if (proxy) {
      this.httpsAgent = proxy2httpsAgent(proxy, new URL(this._BASE_URL).protocol.replace(':', ''));
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
    let goCqhttpOptions: GoCqhttpOptions;
    if (sendOptions.customOptions) {
      goCqhttpOptions = sendOptions.customOptions;
    } else {
      goCqhttpOptions = {
        message: sendOptions.message
      };
      if (this.user_id) {
        goCqhttpOptions.user_id = this.user_id;
      }
      if (this.group_id) {
        goCqhttpOptions.group_id = this.group_id;
      }
      if (this.guild_id) {
        goCqhttpOptions.guild_id = this.guild_id;
      }
      if (this.channel_id) {
        goCqhttpOptions.channel_id = this.channel_id;
      }
    }
    if (sendOptions.extraOptions) {
      goCqhttpOptions = {
        ...goCqhttpOptions,
        ...sendOptions.extraOptions
      };
    }

    if (
      (goCqhttpOptions.guild_id && !goCqhttpOptions.channel_id) ||
      (goCqhttpOptions.channel_id && !goCqhttpOptions.guild_id)
    ) {
      return {
        status: 103,
        statusText: 'Options Format Error: Both "channel_id" & "guild_id" must exist',
        extraMessage: goCqhttpOptions
      };
    }

    if ([goCqhttpOptions.user_id, goCqhttpOptions.group_id, goCqhttpOptions.channel_id].filter((e) => e).length > 1) {
      return {
        status: 103,
        statusText: 'Options Format Error: "user_id", "group_id", and "channel_id" cannot exist at the same time',
        extraMessage: goCqhttpOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: `${this._BASE_URL}${goCqhttpOptions.channel_id ? '/send_guild_channel_msg' : '/send_msg'}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this._KEY}`
      },
      data: goCqhttpOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data.retcode === 0) {
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

export { GoCqhttp };
