'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var axios = require('axios');
var tool = require('./tool');
var _QQBot_brand = /*#__PURE__*/new WeakSet();
class QQBot {
  constructor({
    appId,
    appSecret,
    userId,
    groupId,
    channelId,
    baseUrl,
    key,
    proxy
  }) {
    _classPrivateMethodInitSpec(this, _QQBot_brand);
    _defineProperty(this, "_APP_ID", void 0);
    _defineProperty(this, "_CLIENT_SECRET", void 0);
    _defineProperty(this, "_TOKEN", void 0);
    _defineProperty(this, "_TOKEN_EXPIRE_AT", 0);
    _defineProperty(this, "tokenURL", 'https://bots.qq.com/app/getAppAccessToken');
    _defineProperty(this, "baseUrl", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    _defineProperty(this, "userId", void 0);
    _defineProperty(this, "groupId", void 0);
    _defineProperty(this, "channelId", void 0);
    _defineProperty(this, "guildId", void 0);
    const $key = {
      appId,
      appSecret,
      userId,
      groupId,
      channelId,
      // guildId,
      baseUrl,
      ...key
    };
    if (!$key.appId) {
      throw new Error('Missing Parameter: appId');
    }
    if (!$key.appSecret) {
      throw new Error('Missing Parameter: appSecret');
    }
    this._APP_ID = $key.appId;
    this._CLIENT_SECRET = $key.appSecret;
    this.baseUrl = $key.baseUrl || 'https://api.sgroup.qq.com';
    this.userId = $key.userId;
    this.groupId = $key.groupId;
    this.channelId = $key.channelId;
    this.guildId = $key.guildId;
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
    let qqBotOptions;
    if (sendOptions.customOptions) {
      qqBotOptions = sendOptions.customOptions;
    } else if (!sendOptions.type || sendOptions.type === 'text') {
      qqBotOptions = {
        msg_type: 0,
        content: sendOptions.message
      };
    } else if (sendOptions.type === 'markdown') {
      qqBotOptions = {
        msg_type: 2,
        markdown: {
          content: sendOptions.message
        }
      };
    } else {
      return {
        status: 103,
        statusText: 'Options Format Error',
        extraMessage: sendOptions
      };
    }
    if (sendOptions.extraOptions) {
      qqBotOptions = {
        ...qqBotOptions,
        ...sendOptions.extraOptions
      };
    }
    const userId = qqBotOptions.userId || this.userId;
    const groupId = qqBotOptions.groupId || this.groupId;
    const channelId = qqBotOptions.channelId || this.channelId;
    // const guildId = qqBotOptions.guildId || this.guildId;
    if (!userId && !groupId && !channelId) {
      return {
        status: 0,
        statusText: 'Missing Parameter: userId or groupId or channelId',
        extraMessage: null
      };
    }
    if (!this._TOKEN || Date.now() >= this._TOKEN_EXPIRE_AT) {
      const tokenResult = await _assertClassBrand(_QQBot_brand, this, _getToken).call(this);
      if (tokenResult.status !== 200) {
        return tokenResult;
      }
    }
    let messageURL = `${this.baseUrl}/channels/${channelId}/messages`;
    // if (channelId) {
    //   messageURL = `${this.baseUrl}/channels/${channelId}/messages`;
    // }
    if (groupId) {
      messageURL = `${this.baseUrl}/v2/groups/${groupId}/messages`;
    }
    if (userId) {
      messageURL = `${this.baseUrl}/v2/users/${userId}/messages`;
    }
    const axiosOptions = {
      url: messageURL,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `QQBot ${this._TOKEN}`
      },
      data: qqBotOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (!response.data.code) {
          return {
            status: 200,
            statusText: 'Success',
            extraMessage: response
          };
        }
        if (response.data.code === 304023) {
          return {
            status: 201,
            statusText: 'Waiting',
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
    }).catch(error => {
      var _error$response;
      if ((error === null || error === void 0 || (_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.code) === 304023) {
        return {
          status: 201,
          statusText: 'Waiting',
          extraMessage: error
        };
      }
      return {
        status: 102,
        statusText: 'Request Error',
        extraMessage: error
      };
    });
  }
}
async function _getToken() {
  const axiosOptions = {
    url: this.tokenURL,
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    data: {
      appId: this._APP_ID,
      clientSecret: this._CLIENT_SECRET
    }
  };
  if (this.httpsAgent) {
    axiosOptions.httpsAgent = this.httpsAgent;
  }
  return axios(axiosOptions).then(response => {
    var _response$data;
    if ((_response$data = response.data) !== null && _response$data !== void 0 && _response$data.access_token) {
      this._TOKEN = response.data.access_token;
      const expiresIn = Number(response.data.expires_in) || 7200;
      this._TOKEN_EXPIRE_AT = Date.now() + Math.max(expiresIn - 60, 1) * 1000;
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
exports.QQBot = QQBot;
