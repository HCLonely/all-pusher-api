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

class Gitter {
  constructor({
    token,
    roomId,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);

    _defineProperty(this, "_ROOM_ID", void 0);

    _defineProperty(this, "_BASE_URL", 'https://api.gitter.im/v1/rooms/');

    _defineProperty(this, "httpsAgent", void 0);

    const $key = {
      token,
      roomId,
      ...key
    };

    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }

    if (!$key.roomId) {
      throw new Error('Missing Parameter: roomId');
    }

    this._KEY = $key.token;
    this._ROOM_ID = $key.roomId;

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

    let gitterOptions;

    if (sendOptions.customOptions) {
      gitterOptions = sendOptions.customOptions;
    } else {
      gitterOptions = {
        text: sendOptions.message
      };
    }

    if (sendOptions.extraOptions) {
      gitterOptions = { ...gitterOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions = {
      url: `${this._BASE_URL}${this._ROOM_ID}/chatMessages`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this._KEY}`
      },
      data: gitterOptions
    };

    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    return axios__default["default"](axiosOptions).then(response => {
      if (response.data) {
        if (response.data.id) {
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

exports.Gitter = Gitter;
