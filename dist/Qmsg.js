'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var axios = require('axios');
var tool = require('./tool');
class Qmsg {
  constructor({
    token,
    group,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "_GROUP", void 0);
    _defineProperty(this, "baseURL", 'https://qmsg.zendee.cn/v3/jsend/');
    _defineProperty(this, "httpsAgent", void 0);
    const $key = {
      token,
      group,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    this._GROUP = $key.group;
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
    let qmsgOptions;
    if (sendOptions.customOptions) {
      qmsgOptions = {
        ...sendOptions.customOptions
      };
    } else {
      qmsgOptions = {
        msg: sendOptions.title ? `${sendOptions.title}\n${sendOptions.message}` : sendOptions.message
      };
      if (this._GROUP) {
        qmsgOptions.group = this._GROUP;
      }
    }
    qmsgOptions = {
      ...qmsgOptions,
      ...sendOptions.extraOptions
    };
    if (typeof qmsgOptions.msg !== 'string' || !qmsgOptions.msg.trim()) {
      return {
        status: 0,
        statusText: 'Missing Parameter: msg',
        extraMessage: null
      };
    }
    if (qmsgOptions.msg.length > 1000) {
      return {
        status: 103,
        statusText: 'Invalid Parameter: msg exceeds 1000 characters',
        extraMessage: null
      };
    }
    const axiosOptions = {
      url: `${this.baseURL}${encodeURIComponent(this._KEY)}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: qmsgOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (!response.data) {
        return {
          status: 101,
          statusText: 'No Response Data',
          extraMessage: response
        };
      }
      if (response.data.success === true) {
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
exports.Qmsg = Qmsg;
