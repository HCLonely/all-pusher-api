'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var axios = require('axios');
var tool = require('./tool');
class ServerChanTurbo {
  constructor({
    token,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://sctapi.ftqq.com/');
    _defineProperty(this, "httpsAgent", void 0);
    const $key = {
      token,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
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
    let serverChanTurboOptions;
    if (sendOptions.customOptions) {
      serverChanTurboOptions = sendOptions.customOptions;
    } else {
      serverChanTurboOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        desp: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      serverChanTurboOptions = {
        ...serverChanTurboOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: `${this.baseURL}${this._KEY}.send`,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: tool.queryStringify(serverChanTurboOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        var _response$data$data;
        if (((_response$data$data = response.data.data) === null || _response$data$data === void 0 ? void 0 : _response$data$data.error) === 'SUCCESS') {
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
exports.ServerChanTurbo = ServerChanTurbo;
