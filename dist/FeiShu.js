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

class FeiShu {
  constructor({
    token,
    secret,
    key,
    proxy
  }) {
    _classPrivateMethodInitSpec(this, _sign);

    _defineProperty(this, "_KEY", void 0);

    _defineProperty(this, "_SECRET", void 0);

    _defineProperty(this, "baseURL", 'https://open.feishu.cn/open-apis/bot/v2/hook/');

    _defineProperty(this, "httpsAgent", void 0);

    const $key = {
      token,
      secret,
      ...key
    };

    if (!$key.token) {
      throw new Error('Missing Parameter: key.token');
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

    let feiShuOptions;

    if (sendOptions.customOptions) {
      feiShuOptions = sendOptions.customOptions;
    } else {
      if (!sendOptions.type || sendOptions.type === 'text') {
        feiShuOptions = {
          msg_type: 'text',
          content: {
            text: sendOptions.message
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

    if (this._SECRET) {
      feiShuOptions = { ..._classPrivateMethodGet(this, _sign, _sign2).call(this),
        ...feiShuOptions
      };
    }

    if (sendOptions.extraOptions) {
      feiShuOptions = { ...feiShuOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions = {
      url: `${this.baseURL}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: feiShuOptions
    };

    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    return axios__default["default"](axiosOptions).then(response => {
      if (response.data) {
        if (!response.data.code) {
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
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const stringToSign = `${timestamp}\n${this._SECRET}`;
  const hash = crypto.createHmac('sha256', stringToSign).digest();
  return {
    timestamp,
    sign: hash.toString('base64')
  };
}

exports.FeiShu = FeiShu;
