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

class PushPlus {
  constructor({
    token,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);

    _defineProperty(this, "baseURL", 'https://pushplus.hxtrip.com/send/');

    _defineProperty(this, "httpsAgent", void 0);

    const $key = {
      token,
      ...key
    };

    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }

    this._KEY = $key.token;

    if (proxy) {
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

    let pushPlusOptions;

    if (sendOptions.customOptions) {
      pushPlusOptions = sendOptions.customOptions;
    } else {
      pushPlusOptions = {
        content: sendOptions.message
      };

      if (sendOptions.title) {
        pushPlusOptions.title = sendOptions.title;
      }

      if (['html', 'markdown'].includes(sendOptions.type || '')) {
        pushPlusOptions.template = 'html';
      }

      if (sendOptions.type === 'markdown') {
        // @ts-ignore
        pushPlusOptions.content = new showdown__default["default"]().Converter().makeHtml(sendOptions.message);
      }
    }

    if (sendOptions.extraOptions) {
      pushPlusOptions = { ...pushPlusOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions = {
      url: `${this.baseURL}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: pushPlusOptions
    };

    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    return axios__default["default"](axiosOptions).then(response => {
      if (response.data) {
        if (response.data.code === 200) {
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

exports.PushPlus = PushPlus;
