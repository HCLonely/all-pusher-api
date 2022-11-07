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

class RocketChat {
  constructor({
    webhook,
    key,
    proxy
  }) {
    _defineProperty(this, "_WEBHOOK", void 0);

    _defineProperty(this, "httpsAgent", void 0);

    const $key = {
      webhook,
      ...key
    };

    if (!$key.webhook) {
      throw new Error('Missing Parameter: webhook');
    }

    this._WEBHOOK = $key.webhook;

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

    let rocketChatOptions;

    if (sendOptions.customOptions) {
      rocketChatOptions = sendOptions.customOptions;
    } else {
      rocketChatOptions = {
        text: sendOptions.message
      };
    }

    if (sendOptions.extraOptions) {
      rocketChatOptions = { ...rocketChatOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions = {
      url: this._WEBHOOK,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: rocketChatOptions
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

exports.RocketChat = RocketChat;
