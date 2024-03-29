'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var axios = require('axios');
var tool = require('./tool');
class NowPush {
  constructor({
    token,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://www.api.nowpush.app/v3/sendMessage');
    _defineProperty(this, "httpsAgent", void 0);
    const $key = {
      token,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  async send(sendOptions) {
    if (!sendOptions.message && !sendOptions.customOptions) {
      return {
        status: 0,
        statusText: 'Missing Parameter: message',
        extraMessage: null
      };
    }
    let nowPushOptions;
    if (sendOptions.customOptions) {
      nowPushOptions = sendOptions.customOptions;
    } else {
      nowPushOptions = {
        message_type: 'nowpush_note',
        note: sendOptions.message
      };
    }
    nowPushOptions.device_type = 'api';
    if (sendOptions.extraOptions) {
      nowPushOptions = {
        ...nowPushOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: this.baseURL,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${this._KEY}`
      },
      data: tool.queryStringify(nowPushOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data.isError === false) {
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
    }).catch(error => ({
      status: 102,
      statusText: 'Request Error',
      extraMessage: error
    }));
  }
}
exports.NowPush = NowPush;
