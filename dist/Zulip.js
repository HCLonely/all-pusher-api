'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var axios = require('axios');
var tool = require('./tool');
var _baseUrl = /*#__PURE__*/new WeakMap();
class Zulip {
  constructor({
    site,
    token,
    to,
    email,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "_EMAIL", void 0);
    _classPrivateFieldInitSpec(this, _baseUrl, void 0);
    _defineProperty(this, "to", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    const $key = {
      token,
      email,
      to,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    if (!$key.email) {
      throw new Error('Missing Parameter: email');
    }
    this._KEY = $key.token;
    this._EMAIL = $key.email;
    _classPrivateFieldSet(_baseUrl, this, `${site || 'https://chat.zulip.org'}/api/v1/messages`);
    if ($key.to) {
      this.to = $key.to;
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
    let zulipOptions;
    if (sendOptions.customOptions) {
      zulipOptions = sendOptions.customOptions;
    } else {
      zulipOptions = {
        content: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      zulipOptions = {
        ...zulipOptions,
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
      zulipOptions.type = 'direct';
    }
    const axiosOptions = {
      url: _classPrivateFieldGet(_baseUrl, this),
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${this._EMAIL}:${this._KEY}`).toString('base64')}`
      },
      data: tool.queryStringify(zulipOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
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
