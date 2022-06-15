'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");

var _classPrivateFieldGet = require("@babel/runtime/helpers/classPrivateFieldGet");

var _classPrivateFieldSet = require("@babel/runtime/helpers/classPrivateFieldSet");

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

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

var _baseURL = /*#__PURE__*/new WeakMap();

class Bark {
  constructor({
    token,
    baseURL,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);

    _classPrivateFieldInitSpec(this, _baseURL, {
      writable: true,
      value: 'https://api.day.app/push'
    });

    _defineProperty(this, "httpsAgent", void 0);

    const $key = {
      token,
      baseURL,
      ...key
    };

    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }

    this._KEY = $key.token;

    if ($key.baseURL) {
      _classPrivateFieldSet(this, _baseURL, $key.baseURL);
    }

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

    let barkOptions;

    if (sendOptions.customOptions) {
      barkOptions = sendOptions.customOptions;
    } else {
      barkOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        body: sendOptions.message
      };
    }

    if (sendOptions.extraOptions) {
      barkOptions = { ...barkOptions,
        ...sendOptions.extraOptions
      };
    }

    if (!barkOptions.device_key) {
      barkOptions.device_key = this._KEY;
    }

    const axiosOptions = {
      url: _classPrivateFieldGet(this, _baseURL),
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: barkOptions
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

exports.Bark = Bark;
