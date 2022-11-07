import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent, proxy, result, sendOptions } from './tool';
import showdown from 'showdown';

interface WxPusherConfig {
  key?: {
    token: string,
    uids?: Array<string>,
    topicIds?: Array<number>,
  }
  token?: string,
  uids?: Array<string>,
  topicIds?: Array<number>,
  proxy?: proxy
}
interface WxPusherOptions {
  appToken: string
  content: string
  summary?: string
  contentType: number
  topicIds?: Array<number>
  uids?: Array<string>
  url?: string
  [name: string]: any
}

class WxPusher {
  protected _KEY: string;
  readonly baseURL = 'https://wxpusher.zjiecode.com/api/send/message';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];
  uids?: Array<string>;
  topicIds?: Array<number>;

  constructor({ token, uids, topicIds, key, proxy }: WxPusherConfig) {
    const $key = {
      token, uids, topicIds,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if ($key.uids) {
      this.uids = $key.uids;
    }
    if ($key.topicIds) {
      this.topicIds = $key.topicIds;
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
    let wxPusherOptions: WxPusherOptions;
    if (sendOptions.customOptions) {
      wxPusherOptions = sendOptions.customOptions;
      wxPusherOptions.appToken = this._KEY;
    } else {
      wxPusherOptions = {
        content: sendOptions.message,
        appToken: this._KEY,
        contentType: ['html', 'markdown'].includes(sendOptions.type || '') ? 2 : 1
      };
      if (sendOptions.title) {
        wxPusherOptions.summary = sendOptions.title;
      }
      if (sendOptions.type === 'markdown') {
        // @ts-ignore
        wxPusherOptions.content = new showdown().Converter().makeHtml(sendOptions.message);
      }
    }

    if (!wxPusherOptions.uids && this.uids) {
      wxPusherOptions.uids = this.uids;
    }
    if (!wxPusherOptions.topicIds && this.topicIds) {
      wxPusherOptions.topicIds = this.topicIds;
    }
    if (sendOptions.extraOptions) {
      wxPusherOptions = {
        ...wxPusherOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions: AxiosRequestConfig = {
      url: this.baseURL,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: wxPusherOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then((response) => {
      if (response.data) {
        if (response.data.success === true) {
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

export { WxPusher };
