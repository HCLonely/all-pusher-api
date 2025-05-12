'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var _classPrivateFieldGet = require("@babel/runtime/helpers/classPrivateFieldGet");
var _classPrivateFieldSet = require("@babel/runtime/helpers/classPrivateFieldSet");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var axios = require('axios');
var tool = require('./tool');
var _baseURL = /*#__PURE__*/new WeakMap();
class PushMe {
  constructor({
    token,
    baseURL,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _classPrivateFieldInitSpec(this, _baseURL, {
      writable: true,
      value: 'https://push.i-i.me'
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
    let pushMeOptions;
    if (sendOptions.customOptions) {
      pushMeOptions = sendOptions.customOptions;
    } else {
      pushMeOptions = {
        content: sendOptions.message
      };
      if (sendOptions.title) {
        pushMeOptions.title = sendOptions.title;
      }
      if (['html', 'markdown'].includes(sendOptions.type || '')) {
        pushMeOptions.type = sendOptions.type;
      }
    }
    pushMeOptions.push_key = this._KEY;
    if (sendOptions.extraOptions) {
      pushMeOptions = {
        ...pushMeOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: `${_classPrivateFieldGet(this, _baseURL)}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: pushMeOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data === 'success') {
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
exports.PushMe = PushMe;
