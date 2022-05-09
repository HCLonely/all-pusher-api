'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

Object.defineProperty(exports, '__esModule', {
  value: true
});

var axios = require('axios');

var crypto = require('crypto');

var tool = require('./tool');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {
    'default': e
  };
}

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

var _sign = /*#__PURE__*/new WeakSet();

class DingTalk {
  constructor({
    token,
    key,
    proxy
  }) {
    _classPrivateMethodInitSpec(this, _sign);

    _defineProperty(this, "_KEY", void 0);

    _defineProperty(this, "_SECRET", void 0);

    _defineProperty(this, "baseURL", 'https://oapi.dingtalk.com/robot/send');

    _defineProperty(this, "httpsAgent", void 0);

    if (!token && !(key !== null && key !== void 0 && key.token)) {
      throw new Error('Missing Parameter: token');
    } // @ts-ignore


    this._KEY = token || key.token;

    if (key !== null && key !== void 0 && key.secret) {
      this._SECRET = key.secret;
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
      dingTalkOptions = { ...dingTalkOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions = {
      url: `${this.baseURL}?access_token=${this._KEY}${this._SECRET ? `&${tool.queryStringify(_classPrivateMethodGet(this, _sign, _sign2).call(this))}` : ''}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: dingTalkOptions
    };

    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    return axios__default["default"](axiosOptions).then(response => {
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

function _sign2() {
  const timestamp = new Date().getTime();
  const stringToSign = `${timestamp}\n${this._SECRET}`;
  const hash = crypto.createHmac('sha256', this._SECRET).update(stringToSign, 'utf8').digest();
  return {
    timestamp,
    sign: encodeURIComponent(hash.toString('base64'))
  };
}

exports.DingTalk = DingTalk;
