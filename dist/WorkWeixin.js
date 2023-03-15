'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

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

var _getToken = /*#__PURE__*/new WeakSet();

class WorkWeixin {
  constructor({
    corpid,
    secret,
    agentid,
    touser,
    key,
    proxy
  }) {
    _classPrivateMethodInitSpec(this, _getToken);

    _defineProperty(this, "_CORPID", void 0);

    _defineProperty(this, "_SECRET", void 0);

    _defineProperty(this, "_AGENT_ID", void 0);

    _defineProperty(this, "_TOKEN", void 0);

    _defineProperty(this, "baseURL", 'https://qyapi.weixin.qq.com/cgi-bin/message/send');

    _defineProperty(this, "httpsAgent", void 0);

    _defineProperty(this, "touser", void 0);

    const $key = {
      corpid,
      secret,
      agentid,
      touser,
      ...key
    };

    if (!$key.corpid) {
      throw new Error('Missing Parameter: corpid');
    }

    if (!$key.secret) {
      throw new Error('Missing Parameter: secret');
    }

    if (!$key.agentid) {
      throw new Error('Missing Parameter: agentid');
    }

    this._CORPID = $key.corpid;
    this._SECRET = $key.secret;
    this._AGENT_ID = $key.agentid;

    if ($key.touser) {
      this.touser = $key.touser;
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

    let workWeixinOptions;

    if (sendOptions.customOptions) {
      workWeixinOptions = sendOptions.customOptions;

      if (!workWeixinOptions.agentid) {
        workWeixinOptions.agentid = this._AGENT_ID;
      }

      if (!workWeixinOptions.touser && !workWeixinOptions.totag && !workWeixinOptions.toparty) {
        workWeixinOptions.touser = this.touser;
      }
    } else {
      if (!sendOptions.type || sendOptions.type === 'text') {
        workWeixinOptions = {
          agentid: this._AGENT_ID,
          msgtype: 'text',
          text: {
            content: sendOptions.message
          },
          touser: this.touser
        };
      } else if (sendOptions.type === 'markdown') {
        workWeixinOptions = {
          agentid: this._AGENT_ID,
          msgtype: 'markdown',
          markdown: {
            content: sendOptions.message
          },
          touser: this.touser
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
      workWeixinOptions = { ...workWeixinOptions,
        ...sendOptions.extraOptions
      };
    }

    if (!this._TOKEN) {
      const result = await _classPrivateMethodGet(this, _getToken, _getToken2).call(this);

      if (result.status !== 200) {
        return result;
      }
    }

    const axiosOptions = {
      url: `${this.baseURL}?access_token=${this._TOKEN}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: workWeixinOptions
    };

    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    return axios__default["default"](axiosOptions).then(response => {
      if (response.data) {
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

async function _getToken2() {
  return axios__default["default"].get(`https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${this._CORPID}&corpsecret=${this._SECRET}`).then(response => {
    if (response.data.access_token) {
      this._TOKEN = response.data.access_token;
      return {
        status: 200,
        statusText: 'Success',
        extraMessage: response
      };
    }

    return {
      status: 104,
      statusText: 'Get "access_token" Failed',
      extraMessage: response
    };
  }).catch(error => ({
    status: 104,
    statusText: 'Get "access_token" Failed',
    extraMessage: error
  }));
}

exports.WorkWeixin = WorkWeixin;
