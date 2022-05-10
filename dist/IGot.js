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

class IGot {
  constructor({
    token,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);

    _defineProperty(this, "baseURL", 'https://push.hellyw.com/');

    _defineProperty(this, "httpsAgent", void 0);

    if (!token && !(key !== null && key !== void 0 && key.token)) {
      throw new Error('Missing Parameter: token');
    } // @ts-ignore


    this._KEY = token || key.token;

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

    let iGotOptions;

    if (sendOptions.customOptions) {
      iGotOptions = sendOptions.customOptions;
    } else {
      iGotOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        content: sendOptions.message
      };
    }

    if (sendOptions.extraOptions) {
      iGotOptions = { ...iGotOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions = {
      url: `${this.baseURL}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: iGotOptions
    };

    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    return axios__default["default"](axiosOptions).then(response => {
      if (response.data) {
        if (response.data.ret === 0) {
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

exports.IGot = IGot;
