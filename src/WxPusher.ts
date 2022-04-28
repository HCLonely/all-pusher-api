/* global sendOptions, WxPusherOptions, result, WxPusherConfig */
import axios, { AxiosRequestConfig } from 'axios';
import { proxy2httpsAgent } from './tool';
import showdown from 'showdown';
class WxPusher {
  protected _KEY: string;
  readonly baseURL = 'https://wxpusher.zjiecode.com/api/send/message';
  httpsAgent?: AxiosRequestConfig['httpsAgent'];
  uids?: Array<string>;
  topicIds?: Array<number>;

  constructor({ token, uids, topicIds, key, proxy }: WxPusherConfig) {
    if (!token && !key?.token) {
      throw new Error('Missing Parameter: token');
    }
    // @ts-ignore
    this._KEY = token || key.token;
    if (proxy) {
      this.httpsAgent = proxy2httpsAgent(proxy);
    }
    if (uids || key?.uids) {
    // @ts-ignore
      this.uids = uids || key.uids;
    }
    if (topicIds || key?.topicIds) {
    // @ts-ignore
      this.topicIds = topicIds || key.topicIds;
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
  test(): Promise<result> {
    return this.send({ title: '测试标题', message: '测试内容', type: 'text' });
  }
}

export { WxPusher };
