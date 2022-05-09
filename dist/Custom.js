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

class Custom {
  constructor({
    url,
    method,
    contentType,
    headers,
    key,
    success,
    proxy
  }) {
    _defineProperty(this, "_URL", void 0);

    _defineProperty(this, "httpsAgent", void 0);

    _defineProperty(this, "method", 'POST');

    _defineProperty(this, "contentType", 'application/json');

    _defineProperty(this, "_HEADERS", void 0);

    _defineProperty(this, "success", void 0);

    if (!url && !(key !== null && key !== void 0 && key.url)) {
      throw new Error('Missing Parameter: url');
    }

    if (!success && !(key !== null && key !== void 0 && key.success)) {
      throw new Error('Missing Parameter: success');
    } // @ts-ignore


    this._URL = url || key.url; // @ts-ignore

    this.success = success || key.success;

    if (method || key !== null && key !== void 0 && key.method) {
      // @ts-ignore
      this.method = method || key.method;
    }

    if (contentType || key !== null && key !== void 0 && key.contentType) {
      // @ts-ignore
      this.contentType = contentType || key.contentType;
    }

    if (headers || key !== null && key !== void 0 && key.headers) {
      // @ts-ignore
      this._HEADERS = headers || key.headers;
    }

    if (proxy) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }

  async send(sendOptions) {
    var _axiosOptions$method, _axiosOptions$method2;

    const axiosOptions = {
      url: this._URL,
      method: this.method,
      headers: {
        'Content-type': 'application/json'
      },
      data: sendOptions.extraMessage || sendOptions
    };

    if (this._HEADERS) {
      axiosOptions.headers = this._HEADERS;
    }

    if (this.contentType) {
      axiosOptions.headers['Content-type'] = this.contentType;
    }

    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    if (((_axiosOptions$method = axiosOptions.method) === null || _axiosOptions$method === void 0 ? void 0 : _axiosOptions$method.toUpperCase()) === 'POST' && axiosOptions.headers['Content-type'] === 'application/x-www-form-urlencoded') {
      axiosOptions.data = tool.queryStringify(sendOptions);
    }

    if (((_axiosOptions$method2 = axiosOptions.method) === null || _axiosOptions$method2 === void 0 ? void 0 : _axiosOptions$method2.toUpperCase()) === 'GET') {
      axiosOptions.data = null;
      axiosOptions.url += tool.queryStringify(sendOptions);
    }

    return axios__default["default"](axiosOptions).then(response => {
      if (response.data) {
        let variate = response.data;
        this.success.key.split('.').forEach((key, index) => {
          var _variate;

          if (index === 0) {
            return;
          }

          variate = (_variate = variate) === null || _variate === void 0 ? void 0 : _variate[key];
        });

        if (variate === this.success.value) {
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

exports.Custom = Custom;
