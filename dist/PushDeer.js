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

class PushDeer {
  constructor({
    token,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);

    _defineProperty(this, "baseURL", 'https://api2.pushdeer.com/message/push');

    _defineProperty(this, "httpsAgent", void 0);

    if (!token && !(key !== null && key !== void 0 && key.token)) {
      throw new Error('Missing Parameter: token');
    } // @ts-ignore


    this._KEY = token || key.token;

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

    let pushDeerOptions;

    if (sendOptions.customOptions) {
      pushDeerOptions = sendOptions.customOptions;
    } else {
      pushDeerOptions = {};

      if (sendOptions.title) {
        pushDeerOptions.text = sendOptions.title;
        pushDeerOptions.desp = sendOptions.message;
      } else {
        pushDeerOptions.text = sendOptions.message;
      }

      if (sendOptions.type) {
        pushDeerOptions.type = sendOptions.type;
      }
    }

    pushDeerOptions.pushkey = this._KEY;

    if (sendOptions.extraOptions) {
      pushDeerOptions = { ...pushDeerOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions = {
      url: this.baseURL,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: tool.queryStringify(pushDeerOptions)
    };

    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    return axios__default["default"](axiosOptions).then(response => {
      if (response.data) {
        var _response$data$succes, _response$data$succes2;

        if (((_response$data$succes = response.data.success) === null || _response$data$succes === void 0 ? void 0 : (_response$data$succes2 = _response$data$succes[0]) === null || _response$data$succes2 === void 0 ? void 0 : _response$data$succes2.success) === 'ok' || response.data.code === 0) {
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

exports.PushDeer = PushDeer;
