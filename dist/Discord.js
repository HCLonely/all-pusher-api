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

class Discord {
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

    let discordOptions;

    if (sendOptions.customOptions) {
      discordOptions = sendOptions.customOptions;
    } else {
      discordOptions = {
        content: sendOptions.title ? `${sendOptions.title}\n${sendOptions.message}` : sendOptions.message
      };
    }

    if (sendOptions.extraOptions) {
      discordOptions = { ...discordOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions = {
      url: this._WEBHOOK,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: discordOptions
    };

    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    return axios__default["default"](axiosOptions).then(response => ({
      status: 200,
      statusText: 'Success',
      extraMessage: response
    })).catch(error => ({
      status: 102,
      statusText: 'Request Error',
      extraMessage: error
    }));
  }

}

exports.Discord = Discord;
