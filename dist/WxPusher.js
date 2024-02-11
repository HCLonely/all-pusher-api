'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
Object.defineProperty(exports, '__esModule', {
  value: true
});
var axios = require('axios');
var tool = require('./tool');
var showdown = require('showdown');
function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {
    'default': e
  };
}
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var showdown__default = /*#__PURE__*/_interopDefaultLegacy(showdown);
class WxPusher {
  constructor({
    token,
    uids,
    topicIds,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://wxpusher.zjiecode.com/api/send/message');
    _defineProperty(this, "httpsAgent", void 0);
    _defineProperty(this, "uids", void 0);
    _defineProperty(this, "topicIds", void 0);
    const $key = {
      token,
      uids,
      topicIds,
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
    let wxPusherOptions;
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
        wxPusherOptions.content = new showdown__default["default"]().Converter().makeHtml(sendOptions.message);
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
    const axiosOptions = {
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
    return axios__default["default"](axiosOptions).then(response => {
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
    }).catch(error => ({
      status: 102,
      statusText: 'Request Error',
      extraMessage: error
    }));
  }
}
exports.WxPusher = WxPusher;
