'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var axios = require('axios');
var tool = require('./tool');
var _baseURL = /*#__PURE__*/new WeakMap();
class Chanify {
  constructor({
    token,
    baseURL,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _classPrivateFieldInitSpec(this, _baseURL, 'https://api.chanify.net/v1/sender/');
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
      _classPrivateFieldSet(_baseURL, this, $key.baseURL);
    }
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
    let chanifyOptions;
    if (sendOptions.customOptions) {
      chanifyOptions = sendOptions.customOptions;
    } else {
      chanifyOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        text: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      chanifyOptions = {
        ...chanifyOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: `${_classPrivateFieldGet(_baseURL, this)}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: tool.queryStringify(chanifyOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.status === 200) {
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
    }).catch(error => ({
      status: 102,
      statusText: 'Request Error',
      extraMessage: error
    }));
  }
}
exports.Chanify = Chanify;
