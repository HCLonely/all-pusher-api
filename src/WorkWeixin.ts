import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';

interface WorkWeixinConfig {
  key?: {
    corpid: string
    secret: string
    agentid: number
    touser?: string
  }
  corpid?: string
  secret?: string
  agentid?: number
  touser?: string
  proxy?: proxy
}
interface WorkWeixinOptions {
  touser?: string
  toparty?: string
  totag?: string
  msgtype: string
  agentid: number
  text?: any
  markdown?: any
  safe?: number
  enable_id_trans?: number
  enable_duplicate_check?: number
  duplicate_check_interval?: number
  [name: string]: any
}

class WorkWeixin {
  protected _CORPID: string;
  protected _SECRET: string;
  protected _AGENT_ID: number;
  protected _TOKEN?: string;
  readonly baseURL = 'https://qyapi.weixin.qq.com/cgi-bin/message/send';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];
  touser?: string;

  constructor({ corpid, secret, agentid, touser, key, proxy }: WorkWeixinConfig) {
    const $key = {
      corpid, secret, agentid, touser,
      ...key
    };
    if (!$key.corpid) {
      throw new Error('Missing Parameter: corpid');
    }
    if (!$key.secret) {
      throw new Error('Missing Parameter: secret');
    }
    if (!$key.agentid) {
      throw new Error('Missing Parameter: agentid');
    }
    this._CORPID = $key.corpid;
    this._SECRET = $key.corpid;
    this._AGENT_ID = $key.agentid;
    if ($key.touser) {
      this.touser = $key.touser;
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
    let workWeixinOptions: WorkWeixinOptions;
    if (sendOptions.customOptions) {
      workWeixinOptions = sendOptions.customOptions;
      if (!workWeixinOptions.agentid) {
        workWeixinOptions.agentid = this._AGENT_ID;
      }
      if (!workWeixinOptions.touser && !workWeixinOptions.totag && !workWeixinOptions.toparty) {
        workWeixinOptions.touser = this.touser;
      }
    } else {
      if (!sendOptions.type || sendOptions.type === 'text') {
        workWeixinOptions = {
          agentid: this._AGENT_ID,
          msgtype: 'text',
          text: {
            content: sendOptions.message
          },
          touser: this.touser
        };
      } else if (sendOptions.type === 'markdown') {
        workWeixinOptions = {
          agentid: this._AGENT_ID,
          msgtype: 'markdown',
          markdown: {
            content: sendOptions.message
          },
          touser: this.touser
        };
      } else {
        return {
          status: 103,
          statusText: 'Options Format Error',
          extraMessage: sendOptions
        };
      }
    }
    if (sendOptions.extraOptions) {
      workWeixinOptions = {
        ...workWeixinOptions,
        ...sendOptions.extraOptions
      };
    }
    if (!this._TOKEN) {
      const result = await this.#getToken();
      if (result.status !== 200) {
        return result;
      }
    }
    const axiosOptions: AxiosRequestConfig = {
      url: `${this.baseURL}?access_token=${this._TOKEN}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: workWeixinOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (!response.data.errcode) {
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

  async #getToken(): Promise<result> {
    return axios.get(`https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${this._CORPID}&corpsecret=${this._SECRET}`)
      .then((response) => {
        if (response.data.access_token) {
          this._TOKEN = response.data.access_token;
          return {
            status: 200,
            statusText: 'Success',
            extraMessage: response
          };
        }
        return {
          status: 104,
          statusText: 'Get "access_token" Failed',
          extraMessage: response
        };
      })
      .catch((error) => ({
        status: 104,
        statusText: 'Get "access_token" Failed',
        extraMessage: error
      }));
  }
}

export { WorkWeixin };
