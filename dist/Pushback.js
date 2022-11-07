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

class Pushback {
  constructor({
    token,
    userId,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);

    _defineProperty(this, "_USER_ID", void 0);

    _defineProperty(this, "_BASE_URL", 'https://api.pushback.io/v1/send');

    _defineProperty(this, "httpsAgent", void 0);

    const $key = {
      token,
      userId,
      ...key
    };

    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }

    if (!$key.userId) {
      throw new Error('Missing Parameter: userId');
    }

    this._KEY = $key.token;
    this._USER_ID = $key.userId;

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

    let pushbackOptions;

    if (sendOptions.customOptions) {
      pushbackOptions = sendOptions.customOptions;
    } else {
      pushbackOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        body: sendOptions.message
      };
    }

    if (sendOptions.extraOptions) {
      pushbackOptions = { ...pushbackOptions,
        ...sendOptions.extraOptions
      };
    }

    if (!pushbackOptions.id) {
      pushbackOptions.id = this._USER_ID;
    }

    const axiosOptions = {
      url: this._BASE_URL,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this._KEY}`
      },
      data: pushbackOptions
    };

    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    return axios__default["default"](axiosOptions).then(response => {
      if (![null, undefined, ''].includes(response.data)) {
        if (response.data === 0) {
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

exports.Pushback = Pushback;
