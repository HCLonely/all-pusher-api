'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var axios = require('axios');
var crypto = require('crypto');
var tool = require('./tool');
var _DingTalk_brand = /*#__PURE__*/new WeakSet();
class DingTalk {
  constructor({
    token,
    secret,
    key,
    proxy
  }) {
    _classPrivateMethodInitSpec(this, _DingTalk_brand);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "_SECRET", void 0);
    _defineProperty(this, "baseURL", 'https://oapi.dingtalk.com/robot/send');
    _defineProperty(this, "httpsAgent", void 0);
    const $key = {
      token,
      secret,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if ($key.secret) {
      this._SECRET = $key.secret;
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
    let dingTalkOptions;
    if (sendOptions.customOptions) {
      dingTalkOptions = sendOptions.customOptions;
    } else {
      if (!sendOptions.type || sendOptions.type === 'text') {
        dingTalkOptions = {
          msgtype: 'text',
          text: {
            content: sendOptions.message
          }
        };
      } else if (sendOptions.type === 'markdown') {
        dingTalkOptions = {
          msgtype: 'markdown',
          markdown: {
            text: sendOptions.message,
            title: sendOptions.title || sendOptions.message.split('\n')[0].trim()
          }
        };
      } else {
        return {
          status: 103,
          statusText: 'Options Format Error',
          extraMessage: sendOptions
        };
      }
    }
    if (sendOptions.extraOptions) {
      dingTalkOptions = {
        ...dingTalkOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: `${this.baseURL}?access_token=${this._KEY}${this._SECRET ? `&${tool.queryStringify(_assertClassBrand(_DingTalk_brand, this, _sign).call(this))}` : ''}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: dingTalkOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        console.log(response.data.errcode);
        if (!response.data.errcode) {
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
function _sign() {
  const timestamp = new Date().getTime();
  const stringToSign = `${timestamp}\n${this._SECRET}`;
  const hash = crypto.createHmac('sha256', this._SECRET).update(stringToSign, 'utf8').digest();
  return {
    timestamp,
    sign: encodeURIComponent(hash.toString('base64'))
  };
}
exports.DingTalk = DingTalk;
