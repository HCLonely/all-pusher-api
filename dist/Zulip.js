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

var _baseUrl = /*#__PURE__*/new WeakMap();

class Zulip {
  constructor({
    token,
    domain,
    to,
    email,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);

    _defineProperty(this, "_EMAIL", void 0);

    _classPrivateFieldInitSpec(this, _baseUrl, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, "to", void 0);

    _defineProperty(this, "httpsAgent", void 0);

    const $key = {
      token,
      domain,
      email,
      to,
      ...key
    };

    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }

    if (!$key.domain) {
      throw new Error('Missing Parameter: domain');
    }

    if (!$key.email) {
      throw new Error('Missing Parameter: email');
    }

    this._KEY = $key.token;
    this._EMAIL = $key.email;

    _classPrivateFieldSet(this, _baseUrl, `https://${$key.domain}.zulipchat.com/api/v1/messages`);

    if ($key.to) {
      this.to = $key.to;
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

    let zulipOptions;

    if (sendOptions.customOptions) {
      zulipOptions = sendOptions.customOptions;
    } else {
      zulipOptions = {
        content: sendOptions.message
      };
    }

    if (sendOptions.extraOptions) {
      zulipOptions = { ...zulipOptions,
        ...sendOptions.extraOptions
      };
    }

    if (!zulipOptions.to) {
      if (!this.to) {
        return {
          status: 0,
          statusText: 'Missing Parameter: to',
          extraMessage: null
        };
      }

      zulipOptions.to = this.to;
    }

    if (!zulipOptions.type) {
      zulipOptions.type = 'private';
    }

    const axiosOptions = {
      url: _classPrivateFieldGet(this, _baseUrl),
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: this._EMAIL,
        password: this._KEY
      },
      data: tool.queryStringify(zulipOptions)
    };

    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    return axios__default["default"](axiosOptions).then(response => {
      if (response.data) {
        if (response.data.result === 'success') {
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

exports.Zulip = Zulip;
