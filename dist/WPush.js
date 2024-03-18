'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var axios = require('axios');
var tool = require('./tool');
class WPush {
  constructor({
    token,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://api.wpush.cn/api/v1/send');
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
    let wPushOptions;
    if (sendOptions.customOptions) {
      wPushOptions = sendOptions.customOptions;
    } else {
      wPushOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        content: sendOptions.message
      };
    }
    wPushOptions.apikey = this._KEY;
    if (sendOptions.extraOptions) {
      wPushOptions = {
        ...wPushOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: `${this.baseURL}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: wPushOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data.code === 0) {
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
exports.WPush = WPush;
