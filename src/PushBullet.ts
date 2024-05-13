import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface PushBulletConfig {
  key?: {
    token: string
  }
  token?: string,
  proxy?: proxy
}
interface PushBulletOptions {
  type: 'note' | 'file' | 'link'
  body: string
  title?: string
  [name: string]: any
}

class PushBullet {
  protected _KEY: string;
  readonly baseURL = 'https://api.pushbullet.com/v2/pushes';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, key, proxy }: PushBulletConfig) {
    const $key = {
      token,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
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
    let pushBulletOptions: PushBulletOptions;
    if (sendOptions.customOptions) {
      pushBulletOptions = sendOptions.customOptions;
    } else {
      pushBulletOptions = {
        type: 'note',
        body: sendOptions.message,
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10)
      };
    }

    if (sendOptions.extraOptions) {
      pushBulletOptions = {
        ...pushBulletOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: this.baseURL,
      method: 'POST',
      headers: {
        'Access-Token': this._KEY,
        'Content-type': 'application/json'
      },
      data: pushBulletOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.status === 200) {
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

export { PushBullet };
