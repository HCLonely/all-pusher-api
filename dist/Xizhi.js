'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");

Object.defineProperty(exports, '__esModule', {
  value: true
});

var axios = require('axios');

var tool = require('./tool');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {
    'default': e
  };
}

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

class Xizhi {
  constructor({
    token,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);

    _defineProperty(this, "baseURL", 'https://xizhi.qqoq.net/');

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

    let xizhiOptions;

    if (sendOptions.customOptions) {
      xizhiOptions = sendOptions.customOptions;
    } else {
      xizhiOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        content: sendOptions.message
      };
    }

    if (sendOptions.extraOptions) {
      xizhiOptions = { ...xizhiOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions = {
      url: `${this.baseURL}${this._KEY}.send`,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: tool.queryStringify(xizhiOptions)
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

exports.Xizhi = Xizhi;
