import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface GitterConfig {
  key?: {
    token: string
    roomId?: string
  }
  token?: string
  roomId?: string
  proxy?: proxy
}
interface GitterOptions {
  text: string
  [name: string]: any
}

class Gitter {
  protected _KEY: string;
  protected _ROOM_ID: string;
  protected _BASE_URL = 'https://api.gitter.im/v1/rooms/';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, roomId, key, proxy }: GitterConfig) {
    const $key = {
      token,
      roomId,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    if (!$key.roomId) {
      throw new Error('Missing Parameter: roomId');
    }
    this._KEY = $key.token;
    this._ROOM_ID = $key.roomId;
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
    let gitterOptions: GitterOptions;
    if (sendOptions.customOptions) {
      gitterOptions = sendOptions.customOptions;
    } else {
      gitterOptions = {
        text: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      gitterOptions = {
        ...gitterOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions: AxiosRequestConfig = {
      url: `${this._BASE_URL}${this._ROOM_ID}/chatMessages`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this._KEY}`
      },
      data: gitterOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data.id) {
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

export { Gitter };
