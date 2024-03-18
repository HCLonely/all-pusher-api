'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var axios = require('axios');
var tool = require('./tool');
var showdown = require('showdown');
class Pushover {
  constructor({
    token,
    user,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://api.pushover.net/1/messages.json');
    _defineProperty(this, "httpsAgent", void 0);
    _defineProperty(this, "_USER", void 0);
    const $key = {
      token,
      user,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    if (!$key.user) {
      throw new Error('Missing Parameter: user');
    }
    this._KEY = $key.token;
    this._USER = $key.user;
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
    let pushoverOptions = {
      token: this._KEY,
      user: this._USER,
      message: ''
    };
    if (sendOptions.customOptions) {
      pushoverOptions = {
        ...pushoverOptions,
        ...sendOptions.customOptions
      };
    } else {
      pushoverOptions = {
        ...pushoverOptions,
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        message: sendOptions.message
      };
      if (['html', 'markdown'].includes(sendOptions.type || '')) {
        pushoverOptions.html = 1;
      }
      if (sendOptions.type === 'markdown') {
        // @ts-ignore
        pushoverOptions.message = new showdown().Converter().makeHtml(sendOptions.message);
      }
    }
    if (sendOptions.extraOptions) {
      pushoverOptions = {
        ...pushoverOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: this.baseURL,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: tool.queryStringify(pushoverOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data.status === 1) {
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
exports.Pushover = Pushover;
