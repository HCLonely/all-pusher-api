import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions, queryStringify } from './tool';

interface ZulipConfig {
  key?: {
    token: string
    domain: string
    email: string
    to?: string | Array<number | string>
  }
  token?: string
  domain?: string
  email?: string
  to?: string | Array<number | string>
  proxy?: proxy
}
interface ZulipOptions {
  type?: 'private' | 'stream'
  to?: string | Array<number | string>
  content: string
  [name: string]: any
}

class Zulip {
  protected _KEY: string;
  protected _EMAIL: string;
  #baseUrl: string;
  to?: string | Array<number | string>;
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  constructor({ token, domain, to, email, key, proxy }: ZulipConfig) {
    const $key = {
      token,
      domain,
      email,
      to,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    if (!$key.domain) {
      throw new Error('Missing Parameter: domain');
    }
    if (!$key.email) {
      throw new Error('Missing Parameter: email');
    }
    this._KEY = $key.token;
    this._EMAIL = $key.email;
    this.#baseUrl = `https://${$key.domain}.zulipchat.com/api/v1/messages`;
    if ($key.to) {
      this.to = $key.to;
    }
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
    let zulipOptions: ZulipOptions;
    if (sendOptions.customOptions) {
      zulipOptions = sendOptions.customOptions;
    } else {
      zulipOptions = {
        content: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      zulipOptions = {
        ...zulipOptions,
        ...sendOptions.extraOptions
      };
    }
    if (!zulipOptions.to) {
      if (!this.to) {
        return {
          status: 0,
          statusText: 'Missing Parameter: to',
          extraMessage: null
        };
      }
      zulipOptions.to = this.to;
    }
    if (!zulipOptions.type) {
      zulipOptions.type = 'private';
    }
    const axiosOptions: AxiosRequestConfig = {
      url: this.#baseUrl,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: this._EMAIL,
        password: this._KEY
      },
      data: queryStringify(zulipOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data.result === 'success') {
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

export { Zulip };
