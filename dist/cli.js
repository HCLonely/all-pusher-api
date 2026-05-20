#!/usr/bin/env node
'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var commander = require('commander');
var axios = require('axios');
var tool = require('./tool');
var crypto = require('crypto');
var marked = require('marked');
var nodemailer = require('nodemailer');
var WebSocket = require('ws');
var fs = require('fs');
var path = require('path');
function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}
var nodemailer__namespace = /*#__PURE__*/_interopNamespaceDefault(nodemailer);
var fs__namespace = /*#__PURE__*/_interopNamespaceDefault(fs);
var path__namespace = /*#__PURE__*/_interopNamespaceDefault(path);
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
var _baseURL = /*#__PURE__*/new WeakMap();
class PushDeer {
  constructor({
    token,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _classPrivateFieldInitSpec(this, _baseURL, 'https://api2.pushdeer.com/message/push');
    _defineProperty(this, "httpsAgent", void 0);
    const $key = {
      token,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if ($key.baseURL) {
      _classPrivateFieldSet(_baseURL, this, $key.baseURL);
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
      pushDeerOptions = {
        ...pushDeerOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: _classPrivateFieldGet(_baseURL, this),
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: tool.queryStringify(pushDeerOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        var _response$data$succes;
        if (((_response$data$succes = response.data.success) === null || _response$data$succes === void 0 || (_response$data$succes = _response$data$succes[0]) === null || _response$data$succes === void 0 ? void 0 : _response$data$succes.success) === 'ok' || response.data.code === 0) {
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
class TelegramBot {
  constructor({
    token,
    chat_id,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "_CHAT_ID", void 0);
    _defineProperty(this, "baseURL", 'https://api.telegram.org/bot');
    _defineProperty(this, "httpsAgent", void 0);
    const $key = {
      token,
      chat_id,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    if (!$key.chat_id) {
      throw new Error('Missing Parameter: chat_id');
    }
    this._KEY = $key.token;
    this._CHAT_ID = $key.chat_id;
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
    let telegramBotOptions;
    if (sendOptions.customOptions) {
      telegramBotOptions = sendOptions.customOptions;
    } else {
      telegramBotOptions = {
        text: sendOptions.message
      };
      if (sendOptions.type === 'html') {
        telegramBotOptions.parse_mode = 'HTML';
      }
      if (sendOptions.type === 'markdown') {
        telegramBotOptions.parse_mode = 'Markdown';
      }
    }
    if (!telegramBotOptions.chat_id) {
      telegramBotOptions.chat_id = this._CHAT_ID;
    }
    if (sendOptions.extraOptions) {
      telegramBotOptions = {
        ...telegramBotOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: `${this.baseURL}${this._KEY}/sendMessage`,
      method: 'POST',
      data: tool.queryStringify(telegramBotOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data.ok) {
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
class WxPusher {
  constructor({
    token,
    uids,
    topicIds,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://wxpusher.zjiecode.com/api/send/message');
    _defineProperty(this, "httpsAgent", void 0);
    _defineProperty(this, "uids", void 0);
    _defineProperty(this, "topicIds", void 0);
    const $key = {
      token,
      uids,
      topicIds,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if ($key.uids) {
      this.uids = $key.uids;
    }
    if ($key.topicIds) {
      this.topicIds = $key.topicIds;
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
    let wxPusherOptions;
    if (sendOptions.customOptions) {
      wxPusherOptions = sendOptions.customOptions;
      wxPusherOptions.appToken = this._KEY;
    } else {
      wxPusherOptions = {
        content: sendOptions.message,
        appToken: this._KEY,
        contentType: ['html', 'markdown'].includes(sendOptions.type || '') ? 2 : 1
      };
      if (sendOptions.title) {
        wxPusherOptions.summary = sendOptions.title;
      }
      if (sendOptions.type === 'markdown') {
        // @ts-ignore
        wxPusherOptions.content = marked.marked.parse(sendOptions.message);
      }
    }
    if (!wxPusherOptions.uids && this.uids) {
      wxPusherOptions.uids = this.uids;
    }
    if (!wxPusherOptions.topicIds && this.topicIds) {
      wxPusherOptions.topicIds = this.topicIds;
    }
    if (sendOptions.extraOptions) {
      wxPusherOptions = {
        ...wxPusherOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: this.baseURL,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: wxPusherOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
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
class Mail {
  constructor({
    key,
    options,
    proxy
  }) {
    _defineProperty(this, "_SERVER", void 0);
    _defineProperty(this, "options", void 0);
    if (!key) {
      throw new Error('Missing Parameter: key');
    }
    this._SERVER = key;
    this.options = options;
    if (proxy && proxy.enable && proxy.host && proxy.port) {
      this._SERVER.proxy = `${proxy.protocol || 'http'}://${proxy.host}:${proxy.port}`;
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
    let mailOptions;
    if (sendOptions.customOptions) {
      mailOptions = sendOptions.customOptions;
    } else {
      mailOptions = {
        ...this.options,
        subject: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10)
      };
      if (sendOptions.type === 'text') {
        mailOptions.text = sendOptions.message;
      }
      if (sendOptions.type === 'markdown') {
        // @ts-ignore
        mailOptions.html = marked.marked.parse(sendOptions.message);
      }
      if (sendOptions.type === 'html') {
        mailOptions.html = sendOptions.message;
      }
    }
    if (sendOptions.extraOptions) {
      mailOptions = {
        ...mailOptions,
        ...sendOptions.extraOptions
      };
    }
    const transporter = nodemailer__namespace.createTransport(this._SERVER);
    return transporter.sendMail(mailOptions).then(response => ({
      status: 200,
      statusText: 'Success',
      extraMessage: response
    })).catch(error => ({
      status: 102,
      statusText: 'Request Error',
      extraMessage: error
    }));
  }
}
var _FeiShu_brand = /*#__PURE__*/new WeakSet();
class FeiShu {
  constructor({
    token,
    secret,
    key,
    proxy
  }) {
    _classPrivateMethodInitSpec(this, _FeiShu_brand);
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
      feiShuOptions = {
        ..._assertClassBrand(_FeiShu_brand, this, _sign2).call(this),
        ...feiShuOptions
      };
    }
    if (sendOptions.extraOptions) {
      feiShuOptions = {
        ...feiShuOptions,
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
    return axios(axiosOptions).then(response => {
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
var _WorkWeixin_brand = /*#__PURE__*/new WeakSet();
class WorkWeixin {
  constructor({
    corpid,
    secret,
    agentid,
    touser,
    key,
    proxy
  }) {
    _classPrivateMethodInitSpec(this, _WorkWeixin_brand);
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
      workWeixinOptions = {
        ...workWeixinOptions,
        ...sendOptions.extraOptions
      };
    }
    if (!this._TOKEN) {
      const result = await _assertClassBrand(_WorkWeixin_brand, this, _getToken).call(this);
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
    return axios(axiosOptions).then(response => {
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
async function _getToken() {
  return axios.get(`https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${this._CORPID}&corpsecret=${this._SECRET}`).then(response => {
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
class PushPlus {
  constructor({
    token,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'http://www.pushplus.plus/send');
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
    let pushPlusOptions;
    if (sendOptions.customOptions) {
      pushPlusOptions = sendOptions.customOptions;
    } else {
      pushPlusOptions = {
        content: sendOptions.message
      };
      if (sendOptions.title) {
        pushPlusOptions.title = sendOptions.title;
      }
      if (['html', 'markdown'].includes(sendOptions.type || '')) {
        pushPlusOptions.template = sendOptions.type;
      }
    }
    pushPlusOptions.token = this._KEY;
    if (sendOptions.extraOptions) {
      pushPlusOptions = {
        ...pushPlusOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: `${this.baseURL}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: pushPlusOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data.code === 200) {
          return {
            status: 200,
            statusText: 'Success',
            extraMessage: response
          };
        }
        if (response.data.code === 905) {
          return {
            status: 205,
            statusText: 'Error',
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
class Showdoc {
  constructor({
    token,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://push.showdoc.com.cn/server/api/push/');
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
    let showdocOptions;
    if (sendOptions.customOptions) {
      showdocOptions = sendOptions.customOptions;
    } else {
      showdocOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        content: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      showdocOptions = {
        ...showdocOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: `${this.baseURL}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: tool.queryStringify(showdocOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (!response.data.error_code) {
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
class Xizhi {
  constructor({
    token,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://xizhi.qqoq.net/');
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
    let xizhiOptions;
    if (sendOptions.customOptions) {
      xizhiOptions = sendOptions.customOptions;
    } else {
      xizhiOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        content: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      xizhiOptions = {
        ...xizhiOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: `${this.baseURL}${this._KEY}.send`,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: tool.queryStringify(xizhiOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data.code === 200) {
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
class Discord {
  constructor({
    webhook,
    key,
    proxy
  }) {
    _defineProperty(this, "_WEBHOOK", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    const $key = {
      webhook,
      ...key
    };
    if (!$key.webhook) {
      throw new Error('Missing Parameter: webhook');
    }
    this._WEBHOOK = $key.webhook;
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
    let discordOptions;
    if (sendOptions.customOptions) {
      discordOptions = sendOptions.customOptions;
    } else {
      discordOptions = {
        content: sendOptions.title ? `${sendOptions.title}\n${sendOptions.message}` : sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      discordOptions = {
        ...discordOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: this._WEBHOOK,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: discordOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => ({
      status: 200,
      statusText: 'Success',
      extraMessage: response
    })).catch(error => ({
      status: 102,
      statusText: 'Request Error',
      extraMessage: error
    }));
  }
}
class GoCqhttp {
  constructor({
    baseUrl,
    token,
    user_id,
    group_id,
    guild_id,
    channel_id,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "_BASE_URL", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    _defineProperty(this, "user_id", void 0);
    _defineProperty(this, "group_id", void 0);
    _defineProperty(this, "guild_id", void 0);
    _defineProperty(this, "channel_id", void 0);
    const $key = {
      baseUrl,
      token,
      user_id,
      group_id,
      guild_id,
      channel_id,
      ...key
    };
    if (!$key.baseUrl) {
      throw new Error('Missing Parameter: baseUrl');
    }
    this._BASE_URL = $key.baseUrl;
    if ($key.token) {
      this._KEY = $key.token;
    }
    if ($key.user_id) {
      this.user_id = $key.user_id;
    }
    if ($key.group_id) {
      this.group_id = $key.group_id;
    }
    if ($key.guild_id) {
      this.guild_id = $key.guild_id;
    }
    if ($key.channel_id) {
      this.channel_id = $key.channel_id;
    }
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy, new URL(this._BASE_URL).protocol.replace(':', ''));
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
    let goCqhttpOptions;
    if (sendOptions.customOptions) {
      goCqhttpOptions = sendOptions.customOptions;
    } else {
      goCqhttpOptions = {
        message: sendOptions.message
      };
      if (this.user_id) {
        goCqhttpOptions.user_id = this.user_id;
      }
      if (this.group_id) {
        goCqhttpOptions.group_id = this.group_id;
      }
      if (this.guild_id) {
        goCqhttpOptions.guild_id = this.guild_id;
      }
      if (this.channel_id) {
        goCqhttpOptions.channel_id = this.channel_id;
      }
    }
    if (sendOptions.extraOptions) {
      goCqhttpOptions = {
        ...goCqhttpOptions,
        ...sendOptions.extraOptions
      };
    }
    if (goCqhttpOptions.guild_id && !goCqhttpOptions.channel_id || goCqhttpOptions.channel_id && !goCqhttpOptions.guild_id) {
      return {
        status: 103,
        statusText: 'Options Format Error: Both "channel_id" & "guild_id" must exist',
        extraMessage: goCqhttpOptions
      };
    }
    if ([goCqhttpOptions.user_id, goCqhttpOptions.group_id, goCqhttpOptions.channel_id].filter(e => e).length > 1) {
      return {
        status: 103,
        statusText: 'Options Format Error: "user_id", "group_id", and "channel_id" cannot exist at the same time',
        extraMessage: goCqhttpOptions
      };
    }
    const axiosOptions = {
      url: `${this._BASE_URL}${goCqhttpOptions.channel_id ? '/send_guild_channel_msg' : '/send_msg'}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this._KEY}`
      },
      data: goCqhttpOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data.retcode === 0) {
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
class WorkWeixinBot {
  constructor({
    webhook,
    key,
    proxy
  }) {
    _defineProperty(this, "_WEBHOOK", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    const $key = {
      webhook,
      ...key
    };
    if (!$key.webhook) {
      throw new Error('Missing Parameter: webhook');
    }
    this._WEBHOOK = $key.webhook;
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
    } else {
      if (!sendOptions.type || sendOptions.type === 'text') {
        workWeixinOptions = {
          msgtype: 'text',
          text: {
            content: sendOptions.message
          }
        };
      } else if (sendOptions.type === 'markdown') {
        workWeixinOptions = {
          msgtype: 'markdown',
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
    }
    if (sendOptions.extraOptions) {
      workWeixinOptions = {
        ...workWeixinOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: this._WEBHOOK,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: workWeixinOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
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
var _baseURL2 = /*#__PURE__*/new WeakMap();
class Chanify {
  constructor({
    token,
    baseURL,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _classPrivateFieldInitSpec(this, _baseURL2, 'https://api.chanify.net/v1/sender/');
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
      _classPrivateFieldSet(_baseURL2, this, $key.baseURL);
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
    let chanifyOptions;
    if (sendOptions.customOptions) {
      chanifyOptions = sendOptions.customOptions;
    } else {
      chanifyOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        text: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      chanifyOptions = {
        ...chanifyOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: `${_classPrivateFieldGet(_baseURL2, this)}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: tool.queryStringify(chanifyOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.status === 200) {
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
var _baseURL3 = /*#__PURE__*/new WeakMap();
class Bark {
  constructor({
    token,
    baseURL,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _classPrivateFieldInitSpec(this, _baseURL3, 'https://api.day.app/push');
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
      _classPrivateFieldSet(_baseURL3, this, $key.baseURL);
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
    let barkOptions;
    if (sendOptions.customOptions) {
      barkOptions = sendOptions.customOptions;
    } else {
      barkOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        body: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      barkOptions = {
        ...barkOptions,
        ...sendOptions.extraOptions
      };
    }
    if (!barkOptions.device_key) {
      barkOptions.device_key = this._KEY;
    }
    const axiosOptions = {
      url: _classPrivateFieldGet(_baseURL3, this),
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: barkOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data.code === 200) {
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
class GoogleChat {
  constructor({
    webhook,
    key,
    proxy
  }) {
    _defineProperty(this, "_WEBHOOK", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    const $key = {
      webhook,
      ...key
    };
    if (!$key.webhook) {
      throw new Error('Missing Parameter: webhook');
    }
    this._WEBHOOK = $key.webhook;
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
    let googleChatOptions;
    if (sendOptions.customOptions) {
      googleChatOptions = sendOptions.customOptions;
    } else {
      googleChatOptions = {
        text: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      googleChatOptions = {
        ...googleChatOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: this._WEBHOOK,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: googleChatOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (!response.data.error) {
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
class Push {
  constructor({
    token,
    baseURL,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "_BASE_URL", 'https://push.techulus.com/api/v1/notify/');
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
    let pushOptions;
    if (sendOptions.customOptions) {
      pushOptions = sendOptions.customOptions;
    } else {
      pushOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        body: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      pushOptions = {
        ...pushOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: `${this._BASE_URL}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: pushOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
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
class Slack {
  constructor({
    webhook,
    key,
    proxy
  }) {
    _defineProperty(this, "_WEBHOOK", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    const $key = {
      webhook,
      ...key
    };
    if (!$key.webhook) {
      throw new Error('Missing Parameter: webhook');
    }
    this._WEBHOOK = $key.webhook;
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
    let slackOptions;
    if (sendOptions.customOptions) {
      slackOptions = sendOptions.customOptions;
    } else {
      slackOptions = {
        text: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      slackOptions = {
        ...slackOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: this._WEBHOOK,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: slackOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data === 'ok') {
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
class Pushback {
  constructor({
    token,
    userId,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "_USER_ID", void 0);
    _defineProperty(this, "_BASE_URL", 'https://api.pushback.io/v1/send');
    _defineProperty(this, "httpsAgent", void 0);
    const $key = {
      token,
      userId,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    if (!$key.userId) {
      throw new Error('Missing Parameter: userId');
    }
    this._KEY = $key.token;
    this._USER_ID = $key.userId;
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
    let pushbackOptions;
    if (sendOptions.customOptions) {
      pushbackOptions = sendOptions.customOptions;
    } else {
      pushbackOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        body: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      pushbackOptions = {
        ...pushbackOptions,
        ...sendOptions.extraOptions
      };
    }
    if (!pushbackOptions.id) {
      pushbackOptions.id = this._USER_ID;
    }
    const axiosOptions = {
      url: this._BASE_URL,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this._KEY}`
      },
      data: pushbackOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (![null, undefined, ''].includes(response.data)) {
        if (response.data === 0) {
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
var _baseUrl = /*#__PURE__*/new WeakMap();
class Zulip {
  constructor({
    site,
    token,
    to,
    email,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "_EMAIL", void 0);
    _classPrivateFieldInitSpec(this, _baseUrl, void 0);
    _defineProperty(this, "to", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    const $key = {
      token,
      email,
      to,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    if (!$key.email) {
      throw new Error('Missing Parameter: email');
    }
    this._KEY = $key.token;
    this._EMAIL = $key.email;
    _classPrivateFieldSet(_baseUrl, this, `${site || 'https://chat.zulip.org'}/api/v1/messages`);
    if ($key.to) {
      this.to = $key.to;
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
    let zulipOptions;
    if (sendOptions.customOptions) {
      zulipOptions = sendOptions.customOptions;
    } else {
      zulipOptions = {
        content: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      zulipOptions = {
        ...zulipOptions,
        ...sendOptions.extraOptions
      };
    }
    if (!zulipOptions.to) {
      if (!this.to) {
        return {
          status: 0,
          statusText: 'Missing Parameter: to',
          extraMessage: null
        };
      }
      zulipOptions.to = this.to;
    }
    if (!zulipOptions.type) {
      zulipOptions.type = 'direct';
    }
    const axiosOptions = {
      url: _classPrivateFieldGet(_baseUrl, this),
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${this._EMAIL}:${this._KEY}`).toString('base64')}`
      },
      data: tool.queryStringify(zulipOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data.result === 'success') {
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
class RocketChat {
  constructor({
    webhook,
    key,
    proxy
  }) {
    _defineProperty(this, "_WEBHOOK", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    const $key = {
      webhook,
      ...key
    };
    if (!$key.webhook) {
      throw new Error('Missing Parameter: webhook');
    }
    this._WEBHOOK = $key.webhook;
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
    let rocketChatOptions;
    if (sendOptions.customOptions) {
      rocketChatOptions = sendOptions.customOptions;
    } else {
      rocketChatOptions = {
        text: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      rocketChatOptions = {
        ...rocketChatOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: this._WEBHOOK,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: rocketChatOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
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
class Pushover {
  constructor({
    token,
    user,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://api.pushover.net/1/messages.json');
    _defineProperty(this, "httpsAgent", void 0);
    _defineProperty(this, "_USER", void 0);
    const $key = {
      token,
      user,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    if (!$key.user) {
      throw new Error('Missing Parameter: user');
    }
    this._KEY = $key.token;
    this._USER = $key.user;
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
    let pushoverOptions = {
      token: this._KEY,
      user: this._USER,
      message: ''
    };
    if (sendOptions.customOptions) {
      pushoverOptions = {
        ...pushoverOptions,
        ...sendOptions.customOptions
      };
    } else {
      pushoverOptions = {
        ...pushoverOptions,
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        message: sendOptions.message
      };
      if (['html', 'markdown'].includes(sendOptions.type || '')) {
        pushoverOptions.html = 1;
      }
      if (sendOptions.type === 'markdown') {
        // @ts-ignore
        pushoverOptions.message = marked.marked.parse(sendOptions.message);
      }
    }
    if (sendOptions.extraOptions) {
      pushoverOptions = {
        ...pushoverOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: this.baseURL,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: tool.queryStringify(pushoverOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data.status === 1) {
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
class Iyuu {
  constructor({
    token,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://iyuu.cn/');
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
    let iyuuOptions;
    if (sendOptions.customOptions) {
      iyuuOptions = sendOptions.customOptions;
    } else {
      iyuuOptions = {
        text: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        desp: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      iyuuOptions = {
        ...iyuuOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: `${this.baseURL}${this._KEY}.send`,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: tool.queryStringify(iyuuOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data.errcode === 0) {
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
var _baseURL4 = /*#__PURE__*/new WeakMap();
class Ntfy {
  constructor({
    token,
    baseURL,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _classPrivateFieldInitSpec(this, _baseURL4, 'https://ntfy.sh/');
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
      _classPrivateFieldSet(_baseURL4, this, $key.baseURL);
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
    let ntfyOptions;
    if (sendOptions.customOptions) {
      ntfyOptions = sendOptions.customOptions;
    } else {
      ntfyOptions = {
        topic: this._KEY,
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        message: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      ntfyOptions = {
        ...ntfyOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: `${_classPrivateFieldGet(_baseURL4, this)}`,
      method: 'POST',
      data: JSON.stringify(ntfyOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data.topic === this._KEY) {
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
class YiFengChuanHua {
  constructor({
    token,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://www.phprm.com/services/push/send/');
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
    let yiFengChuanHuaOptions;
    if (sendOptions.customOptions) {
      yiFengChuanHuaOptions = sendOptions.customOptions;
    } else {
      yiFengChuanHuaOptions = {
        head: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        body: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      yiFengChuanHuaOptions = {
        ...yiFengChuanHuaOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: `${this.baseURL}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: yiFengChuanHuaOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data.code === 0) {
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
class WPush {
  constructor({
    token,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://api.wpush.cn/api/v1/send');
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
    let wPushOptions;
    if (sendOptions.customOptions) {
      wPushOptions = sendOptions.customOptions;
    } else {
      wPushOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        content: sendOptions.message
      };
    }
    wPushOptions.apikey = this._KEY;
    if (sendOptions.extraOptions) {
      wPushOptions = {
        ...wPushOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: `${this.baseURL}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: wPushOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data.code === 0) {
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
class PushBullet {
  constructor({
    token,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://api.pushbullet.com/v2/pushes');
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
    let pushBulletOptions;
    if (sendOptions.customOptions) {
      pushBulletOptions = sendOptions.customOptions;
    } else {
      pushBulletOptions = {
        type: 'note',
        body: sendOptions.message,
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10)
      };
    }
    if (sendOptions.extraOptions) {
      pushBulletOptions = {
        ...pushBulletOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: this.baseURL,
      method: 'POST',
      headers: {
        'Access-Token': this._KEY,
        'Content-type': 'application/json'
      },
      data: pushBulletOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.status === 200) {
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
class SimplePush {
  constructor({
    token,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://api.simplepush.io/send');
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
    let simplePushOptions;
    if (sendOptions.customOptions) {
      simplePushOptions = sendOptions.customOptions;
    } else {
      simplePushOptions = {
        key: this._KEY,
        msg: sendOptions.message
      };
      if (sendOptions.title) {
        simplePushOptions.title = sendOptions.title;
      }
    }
    if (sendOptions.extraOptions) {
      simplePushOptions = {
        ...simplePushOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: this.baseURL,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: simplePushOptions
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data.status === 'OK') {
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
var _baseURL5 = /*#__PURE__*/new WeakMap();
class PushMe {
  constructor({
    token,
    baseURL,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _classPrivateFieldInitSpec(this, _baseURL5, 'https://push.i-i.me');
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
      _classPrivateFieldSet(_baseURL5, this, $key.baseURL);
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
      url: `${_classPrivateFieldGet(_baseURL5, this)}`,
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
      const tokenResult = await _assertClassBrand(_QQBot_brand, this, _getToken2).call(this);
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
async function _getToken2() {
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
const pusherMap = {
  serverchanturbo: ServerChanTurbo,
  serverchan: ServerChanTurbo,
  pushdeer: PushDeer,
  telegrambot: TelegramBot,
  dingtalk: DingTalk,
  wxpusher: WxPusher,
  mail: Mail,
  feishu: FeiShu,
  workweixin: WorkWeixin,
  // qqchannel: QqChannel,
  pushplus: PushPlus,
  showdoc: Showdoc,
  xizhi: Xizhi,
  discord: Discord,
  gocqhttp: GoCqhttp,
  // qmsg: Qmsg,
  workweixinbot: WorkWeixinBot,
  chanify: Chanify,
  bark: Bark,
  googlechat: GoogleChat,
  push: Push,
  slack: Slack,
  pushback: Pushback,
  zulip: Zulip,
  rocketchat: RocketChat,
  // gitter: Gitter,
  pushover: Pushover,
  iyuu: Iyuu,
  ntfy: Ntfy,
  yifengchuanhua: YiFengChuanHua,
  wpush: WPush,
  pushbullet: PushBullet,
  simplepush: SimplePush,
  // anpush: AnPush
  pushme: PushMe,
  qqbot: QQBot
};
class PushApi {
  constructor(configs) {
    _defineProperty(this, "pushers", []);
    this.pushers = configs.map(({
      name,
      config
    }) => {
      const Pusher = pusherMap[name.toLowerCase()];
      return Pusher ? {
        name,
        pusher: new Pusher(config)
      } : null;
    }).filter(pusher => pusher !== null);
  }
  async send(sendOptions) {
    const results = await Promise.allSettled(this.pushers.map(async ({
      name,
      pusher
    }) => {
      try {
        var _sendOptions$find;
        const options = Array.isArray(sendOptions) ? (_sendOptions$find = sendOptions.find(option => option.name === name || option.name === 'default')) === null || _sendOptions$find === void 0 ? void 0 : _sendOptions$find.options : sendOptions;
        if (!options) {
          return {
            name,
            result: {
              status: 10,
              statusText: 'Missing Options',
              extraMessage: sendOptions
            }
          };
        }
        return {
          name,
          result: await pusher.send(options)
        };
      } catch (error) {
        return {
          name,
          result: {
            status: 11,
            statusText: 'Unknown Error',
            extraMessage: error instanceof Error ? error.message : String(error)
          }
        };
      }
    }));
    return results.map((result, index) => result.status === 'fulfilled' ? result.value : {
      name: this.pushers[index].name,
      result: {
        status: 11,
        statusText: 'Unknown Error',
        extraMessage: result.reason
      }
    });
  }
}
const INTENTS_MAP = {
  GUILDS: 1 << 0,
  GUILD_MEMBERS: 1 << 1,
  GUILD_MESSAGES: 1 << 9,
  GUILD_MESSAGE_REACTIONS: 1 << 10,
  DIRECT_MESSAGE: 1 << 12,
  GROUP_AND_C2C_EVENT: 1 << 25,
  INTERACTION: 1 << 26,
  MESSAGE_AUDIT: 1 << 27,
  FORUMS_EVENT: 1 << 28,
  AUDIO_ACTION: 1 << 29,
  PUBLIC_GUILD_MESSAGES: 1 << 30
};
const OPCODES = {
  0: 'Dispatch',
  1: 'Heartbeat',
  2: 'Identify',
  6: 'Resume',
  7: 'Reconnect',
  9: 'InvalidSession',
  10: 'Hello',
  11: 'HeartbeatACK',
  12: 'HTTPCallbackACK',
  13: 'CallbackVerify'
};
var _QQBotEvent_brand = /*#__PURE__*/new WeakSet();
class QQBotEvent {
  constructor(config) {
    var _config$intents, _config$shard, _config$proxy;
    _classPrivateMethodInitSpec(this, _QQBotEvent_brand);
    _defineProperty(this, "appId", void 0);
    _defineProperty(this, "appSecret", void 0);
    _defineProperty(this, "intents", void 0);
    _defineProperty(this, "shard", void 0);
    _defineProperty(this, "baseUrl", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    _defineProperty(this, "token", void 0);
    _defineProperty(this, "tokenExpireAt", 0);
    _defineProperty(this, "ws", void 0);
    _defineProperty(this, "sessionId", void 0);
    _defineProperty(this, "lastSeq", null);
    // eslint-disable-next-line no-undef
    _defineProperty(this, "heartbeatInterval", void 0);
    _defineProperty(this, "heartbeatMs", 45000);
    if (!config.appId) throw new Error('Missing Parameter: appId');
    if (!config.appSecret) throw new Error('Missing Parameter: appSecret');
    this.appId = config.appId;
    this.appSecret = config.appSecret;
    this.intents = (_config$intents = config.intents) !== null && _config$intents !== void 0 ? _config$intents : 0;
    this.shard = (_config$shard = config.shard) !== null && _config$shard !== void 0 ? _config$shard : [0, 1];
    this.baseUrl = config.baseUrl || 'https://api.sgroup.qq.com';
    if ((_config$proxy = config.proxy) !== null && _config$proxy !== void 0 && _config$proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(config.proxy);
    }
  }
  async start() {
    await _assertClassBrand(_QQBotEvent_brand, this, _ensureToken).call(this);
    const wssUrl = await _assertClassBrand(_QQBotEvent_brand, this, _getGatewayUrl).call(this);
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', `Gateway URL: ${wssUrl}`);
    _assertClassBrand(_QQBotEvent_brand, this, _connect).call(this, wssUrl);
  }
  stop() {
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', 'Stopping...');
    _assertClassBrand(_QQBotEvent_brand, this, _clearHeartbeat).call(this);
    if (this.ws) {
      this.ws.close(1000);
      this.ws = undefined;
    }
  }
  static parseIntents(keys) {
    return keys.reduce((acc, key) => {
      const bit = INTENTS_MAP[key];
      if (!bit) {
        console.error(`Warning: unknown intent "${key}", skipped`);
        return acc;
      }
      return acc | bit;
    }, 0);
  }
  static listIntents() {
    console.log('Available intents:');
    Object.entries(INTENTS_MAP).forEach(([name, bit]) => {
      console.log(`  ${name} (1 << ${Math.log2(bit)})`);
    });
  }
}

/* eslint-disable max-len */
async function _getToken3() {
  var _response$data2;
  const response = await axios({
    url: 'https://bots.qq.com/app/getAppAccessToken',
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    data: {
      appId: this.appId,
      clientSecret: this.appSecret
    },
    httpsAgent: this.httpsAgent
  });
  const accessToken = (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.access_token;
  if (!accessToken) throw new Error(`Get token failed: ${JSON.stringify(response.data)}`);
  const expiresIn = Number(response.data.expires_in) || 7200;
  this.tokenExpireAt = Date.now() + Math.max(expiresIn - 60, 1) * 1000;
  return accessToken;
}
async function _ensureToken() {
  if (!this.token || Date.now() >= this.tokenExpireAt) {
    this.token = await _assertClassBrand(_QQBotEvent_brand, this, _getToken3).call(this);
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', 'Access token obtained');
  }
}
async function _getGatewayUrl() {
  var _response$data3;
  await _assertClassBrand(_QQBotEvent_brand, this, _ensureToken).call(this);
  const response = await axios({
    url: `${this.baseUrl}/gateway`,
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `QQBot ${this.token}`
    },
    httpsAgent: this.httpsAgent
  });
  const url = (_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.url;
  if (!url) throw new Error(`Get gateway failed: ${JSON.stringify(response.data)}`);
  return url;
}
function _connect(url) {
  this.ws = new WebSocket(url);
  this.ws.on('open', () => {
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', 'WebSocket connected');
  });
  this.ws.on('message', data => {
    try {
      const payload = JSON.parse(data.toString());
      _assertClassBrand(_QQBotEvent_brand, this, _handlePayload).call(this, payload);
    } catch {
      _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'error', `Failed to parse message: ${data.toString().slice(0, 200)}`);
    }
  });
  this.ws.on('close', (code, reason) => {
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', `WebSocket closed: code=${code}, reason=${reason.toString()}`);
    _assertClassBrand(_QQBotEvent_brand, this, _clearHeartbeat).call(this);
    _assertClassBrand(_QQBotEvent_brand, this, _tryReconnect).call(this);
  });
  this.ws.on('error', err => {
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'error', `WebSocket error: ${err.message}`);
  });
}
function _handlePayload(payload) {
  const {
    op,
    d,
    s,
    t,
    id
  } = payload;
  const opName = OPCODES[op] || `Unknown(${op})`;
  if (s !== null) {
    this.lastSeq = s;
  }
  switch (op) {
    case 10:
      // Hello
      _assertClassBrand(_QQBotEvent_brand, this, _handleHello).call(this, d);
      break;
    case 11:
      // HeartbeatACK
      _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'debug', 'Heartbeat ACK');
      break;
    case 0:
      // Dispatch
      _assertClassBrand(_QQBotEvent_brand, this, _handleDispatch).call(this, t, d, id);
      break;
    case 7:
      // Reconnect
      _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'warn', 'Server requested reconnect');
      _assertClassBrand(_QQBotEvent_brand, this, _reconnect).call(this);
      break;
    case 9:
      // InvalidSession
      _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'warn', 'Invalid session, re-identifying...');
      this.sessionId = undefined;
      _assertClassBrand(_QQBotEvent_brand, this, _identify).call(this);
      break;
    default:
      _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'debug', `OpCode ${opName}: ${JSON.stringify(d)}`);
  }
}
function _handleHello(d) {
  this.heartbeatMs = (d === null || d === void 0 ? void 0 : d.heartbeat_interval) || 45000;
  _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', `Hello received, heartbeat interval: ${this.heartbeatMs}ms`);
  if (this.sessionId && this.lastSeq !== null) {
    _assertClassBrand(_QQBotEvent_brand, this, _resume).call(this);
  } else {
    _assertClassBrand(_QQBotEvent_brand, this, _identify).call(this);
  }
  _assertClassBrand(_QQBotEvent_brand, this, _startHeartbeat).call(this);
}
function _handleDispatch(t, d, id) {
  const time = new Date().toISOString();
  if (t === 'READY') {
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', '===== READY =====');
    this.sessionId = d === null || d === void 0 ? void 0 : d.session_id;
    console.log(JSON.stringify({
      time,
      type: t,
      data: d
    }, null, 2));
    return;
  }
  if (t === 'RESUMED') {
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', '===== RESUMED =====');
    console.log(JSON.stringify({
      time,
      type: t,
      data: d
    }, null, 2));
    return;
  }
  console.log(JSON.stringify({
    time,
    type: t,
    eventId: id,
    data: d
  }, null, 2));
}
function _identify() {
  if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
  const payload = {
    op: 2,
    d: {
      token: `QQBot ${this.token}`,
      intents: this.intents,
      shard: this.shard,
      properties: {
        $os: process.platform,
        $browser: 'all-pusher-api',
        $device: 'all-pusher-api'
      }
    }
  };
  _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', `Identifying with intents=${this.intents}, shard=[${this.shard}]`);
  this.ws.send(JSON.stringify(payload));
}
function _resume() {
  var _this$lastSeq;
  if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
  const payload = {
    op: 6,
    d: {
      token: `QQBot ${this.token}`,
      session_id: this.sessionId,
      seq: (_this$lastSeq = this.lastSeq) !== null && _this$lastSeq !== void 0 ? _this$lastSeq : 0
    }
  };
  _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', `Resuming session=${this.sessionId}, seq=${this.lastSeq}`);
  this.ws.send(JSON.stringify(payload));
}
function _sendHeartbeat() {
  var _this$lastSeq2;
  if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
  this.ws.send(JSON.stringify({
    op: 1,
    d: (_this$lastSeq2 = this.lastSeq) !== null && _this$lastSeq2 !== void 0 ? _this$lastSeq2 : null
  }));
}
function _startHeartbeat() {
  _assertClassBrand(_QQBotEvent_brand, this, _clearHeartbeat).call(this);
  this.heartbeatInterval = setInterval(() => {
    _assertClassBrand(_QQBotEvent_brand, this, _sendHeartbeat).call(this);
  }, this.heartbeatMs);
}
function _clearHeartbeat() {
  if (this.heartbeatInterval) {
    clearInterval(this.heartbeatInterval);
    this.heartbeatInterval = undefined;
  }
}
function _reconnect() {
  _assertClassBrand(_QQBotEvent_brand, this, _clearHeartbeat).call(this);
  if (this.ws) {
    this.ws.close(1000);
  }
  setTimeout(async () => {
    try {
      const wssUrl = await _assertClassBrand(_QQBotEvent_brand, this, _getGatewayUrl).call(this);
      _assertClassBrand(_QQBotEvent_brand, this, _connect).call(this, wssUrl);
    } catch (err) {
      _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'error', `Reconnect failed: ${err.message}`);
    }
  }, 1000);
}
function _tryReconnect() {
  setTimeout(async () => {
    try {
      if (this.ws) return;
      const wssUrl = await _assertClassBrand(_QQBotEvent_brand, this, _getGatewayUrl).call(this);
      _assertClassBrand(_QQBotEvent_brand, this, _connect).call(this, wssUrl);
    } catch (err) {
      _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'error', `Reconnect failed: ${err.message}`);
    }
  }, 3000);
}
function _log(level, msg) {
  console.error(`[QQBotEvent][${level.toUpperCase()}] ${msg}`);
}
commander.program.name('allpush').version('1.5.0').description('多平台推送通知 CLI 工具，基于 all-pusher-api');
commander.program.command('send').description('向配置的推送平台发送消息').option('-c, --config <config>', 'JSON 配置字符串，需对引号进行转义。在线生成: https://configer.hclonely.com/?fileLink=https://raw.githubusercontent.com/HCLonely/all-pusher-api/main/config/template.yaml.js').option('-f, --config-file <path>', 'JSON 配置文件路径。在线生成: https://configer.hclonely.com/?fileLink=https://raw.githubusercontent.com/HCLonely/all-pusher-api/main/config/template.yaml.js').requiredOption('-m, --message <text>', '要发送的消息内容').option('-t, --title <text>', '消息标题').action(async options => {
  try {
    if (!options.config && !options.configFile) {
      console.error('错误：必须提供 --config 或 --config-file 参数！');
      process.exit(1);
    }
    if (options.config && options.configFile) {
      console.warn('警告：同时提供了 --config 和 --config-file，后者将被忽略！');
    }
    let config;
    if (options.config) {
      config = JSON.parse(options.config);
    } else if (options.configFile) {
      const configPath = path__namespace.resolve(process.cwd(), options.configFile);
      const raw = fs__namespace.readFileSync(configPath, 'utf8');
      config = JSON.parse(raw);
    }
    if (!Array.isArray(config)) {
      config = [config];
    }
    const pusher = new PushApi(config);
    const results = await pusher.send({
      message: options.message,
      title: options.title
    });
    console.log('\n推送结果:');
    results.forEach(({
      name,
      result
    }) => {
      const status = result.status >= 200 && result.status < 300 ? '成功' : '失败';
      console.log(`• ${name}: ${status} (${result.status})`);
      if (result.statusText) {
        console.log(`  详情: ${result.statusText}`);
      }
      if (status === '失败') {
        console.dir(result, {
          depth: null
        });
      }
    });
  } catch (error) {
    console.error('发生错误:', error.message);
    console.error('错误详情:', error.stack);
    process.exit(1);
  }
});
commander.program.command('listen').description('通过 WebSocket 订阅并监听 QQ 机器人事件，接收到事件时输出到控制台').option('--app-id <id>', 'QQ 机器人 AppID').option('--app-secret <secret>', 'QQ 机器人 AppSecret').option('--intents <intents>', '订阅事件类型，逗号分隔', 'GUILDS,GUILD_MEMBERS,GUILD_MESSAGES,GUILD_MESSAGE_REACTIONS,DIRECT_MESSAGE,GROUP_AND_C2C_EVENT,INTERACTION,MESSAGE_AUDIT,FORUMS_EVENT,AUDIO_ACTION,PUBLIC_GUILD_MESSAGES').option('--shard <shard>', '分片参数，格式: index,total (如 0,1)', '0,1').option('--list-intents', '列出所有可用的 Intents 事件类型').action(async options => {
  try {
    if (options.listIntents) {
      QQBotEvent.listIntents();
      process.exit(0);
    }
    if (!options.appId) {
      console.error('错误：必须提供 --app-id 参数！');
      process.exit(1);
    }
    if (!options.appSecret) {
      console.error('错误：必须提供 --app-secret 参数！');
      process.exit(1);
    }
    const intentKeys = options.intents.split(',').map(s => s.trim()).filter(Boolean);
    const intents = QQBotEvent.parseIntents(intentKeys);
    const shardParts = options.shard.split(',').map(Number);
    if (shardParts.length !== 2 || shardParts.some(isNaN)) {
      console.error('错误：--shard 格式必须为 "index,total"，如 "0,1"');
      process.exit(1);
    }
    const shard = [shardParts[0], shardParts[1]];
    console.error(`启动 QQ 机器人事件监听: intents=${intentKeys.join(',')}(${intents}), shard=[${shard}]`);
    const event = new QQBotEvent({
      appId: options.appId,
      appSecret: options.appSecret,
      intents,
      shard
    });
    process.on('SIGINT', () => {
      console.error('\n收到中断信号，正在关闭...');
      event.stop();
      process.exit(0);
    });
    process.on('SIGTERM', () => {
      console.error('收到终止信号，正在关闭...');
      event.stop();
      process.exit(0);
    });
    await event.start();
  } catch (error) {
    console.error('发生错误:', error.message);
    process.exit(1);
  }
});
commander.program.parse(process.argv);
