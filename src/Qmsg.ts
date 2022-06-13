import axios, { AxiosRequestConfig } from 'axios';
import { queryStringify, proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface QmsgConfig {
  token?: string
  qq?: number
  group?: number
  pqq?: number
  pgroup?: number
  bot?: number
  type?: 'qq' | 'group' | 'pqq' | 'pgroup'
  key?: {
    token?: string
    qq?: number
    group?: number
    pqq?: number
    pgroup?: number
    bot?: number
    type?: 'qq' | 'group' | 'pqq' | 'pgroup'
  }
  proxy?: proxy
}
interface QmsgOptions {
  title?: string
  msg: string
  qq?: number
  bot?: number
  [name: string]: any
}

class Qmsg {
  protected _KEY: string;
  readonly baseURL = {
    qq: 'https://qmsg.zendee.cn:443/send/',
    group: 'https://qmsg.zendee.cn:443/group/',
    pqq: 'https://qmsg.zendee.cn:443/psend/',
    pgroup: 'https://qmsg.zendee.cn:443/pgroup/'
  };
  httpsAgent?: AxiosRequestConfig['httpsAgent'];
  type: 'qq' | 'group' | 'pqq' | 'pgroup' = 'qq';
  to?: number;
  use?: number;

  constructor({ token, bot, type, qq, group, pqq, pgroup, key, proxy }: QmsgConfig) {
    const $key = {
      token, bot, type, qq, group, pqq, pgroup,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if ($key.type) {
      this.type = $key.type;
    }
    if ($key.bot) {
      this.use = $key.bot;
    }
    if ($key.qq) {
      this.type = 'qq';
      this.to = $key.qq;
    }
    if ($key.group) {
      this.type = 'group';
      this.to = $key.group;
    }
    if ($key.pqq) {
      this.type = 'pqq';
      this.to = $key.pqq;
    }
    if ($key.pgroup) {
      this.type = 'pgroup';
      this.to = $key.pgroup;
    }
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
    let qmsgOptions: QmsgOptions = { msg: '' };
    if (this.to) {
      qmsgOptions.qq = this.to;
    }
    if (this.use) {
      qmsgOptions.bot = this.use;
    }
    if (sendOptions.customOptions) {
      qmsgOptions = sendOptions.customOptions;
    } else {
      qmsgOptions = {
        msg: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      qmsgOptions = {
        ...qmsgOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: `${this.baseURL[this.type]}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: queryStringify(qmsgOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data.success) {
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

export { Qmsg };
