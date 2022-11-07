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

class TelegramBot {
  constructor({
    token,
    chat_id,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);

    _defineProperty(this, "_CHAT_ID", void 0);

    _defineProperty(this, "baseURL", 'https://api.telegram.org/bot');

    _defineProperty(this, "httpsAgent", void 0);

    const $key = {
      token,
      chat_id,
      ...key
    };

    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }

    if (!$key.chat_id) {
      throw new Error('Missing Parameter: chat_id');
    }

    this._KEY = $key.token;
    this._CHAT_ID = $key.chat_id;

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

    let telegramBotOptions;

    if (sendOptions.customOptions) {
      telegramBotOptions = sendOptions.customOptions;
    } else {
      telegramBotOptions = {
        text: sendOptions.message
      };

      if (sendOptions.type === 'html') {
        telegramBotOptions.parse_mode = 'HTML';
      }

      if (sendOptions.type === 'markdown') {
        telegramBotOptions.parse_mode = 'Markdown';
      }
    }

    if (!telegramBotOptions.chat_id) {
      telegramBotOptions.chat_id = this._CHAT_ID;
    }

    if (sendOptions.extraOptions) {
      telegramBotOptions = { ...telegramBotOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions = {
      url: `${this.baseURL}${this._KEY}/sendMessage`,
      method: 'POST',
      data: tool.queryStringify(telegramBotOptions)
    };

    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    return axios__default["default"](axiosOptions).then(response => {
      if (response.data) {
        if (response.data.ok) {
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

exports.TelegramBot = TelegramBot;
