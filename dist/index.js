'use strict';

var _classPrivateFieldGet = require("@babel/runtime/helpers/classPrivateFieldGet");

var _classPrivateFieldSet = require("@babel/runtime/helpers/classPrivateFieldSet");

var _defineProperty = require("@babel/runtime/helpers/defineProperty");

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

Object.defineProperty(exports, '__esModule', {
  value: true
});

var ServerChanTurbo = require('./ServerChanTurbo');

var PushDeer = require('./PushDeer');

var TelegramBot = require('./TelegramBot');

var DingTalk = require('./DingTalk');

var WxPusher = require('./WxPusher');

var Mail = require('./Mail');

var FeiShu = require('./FeiShu');

var WorkWeixin = require('./WorkWeixin');

var QqChannel = require('./QqChannel');

var PushPlus = require('./PushPlus');

var Showdoc = require('./Showdoc');

var Xizhi = require('./Xizhi');

var Discord = require('./Discord');

var GoCqhttp = require('./GoCqhttp');

var axios = require('axios');

var tool = require('./tool');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {
    'default': e
  };
}

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

class Qmsg {
  constructor({
    token,
    bot,
    type,
    qq,
    group,
    pqq,
    pgroup,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);

    _defineProperty(this, "baseURL", {
      qq: 'https://qmsg.zendee.cn:443/send/',
      group: 'https://qmsg.zendee.cn:443/group/',
      pqq: 'https://qmsg.zendee.cn:443/psend/',
      pgroup: 'https://qmsg.zendee.cn:443/pgroup/'
    });

    _defineProperty(this, "httpsAgent", void 0);

    _defineProperty(this, "type", 'qq');

    _defineProperty(this, "to", void 0);

    _defineProperty(this, "use", void 0);

    const $key = {
      token,
      bot,
      type,
      qq,
      group,
      pqq,
      pgroup,
      ...key
    };

    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }

    this._KEY = $key.token;

    if ($key.type) {
      this.type = $key.type;
    }

    if ($key.bot) {
      this.use = $key.bot;
    }

    if ($key.qq) {
      this.type = 'qq';
      this.to = $key.qq;
    }

    if ($key.group) {
      this.type = 'group';
      this.to = $key.group;
    }

    if ($key.pqq) {
      this.type = 'pqq';
      this.to = $key.pqq;
    }

    if ($key.pgroup) {
      this.type = 'pgroup';
      this.to = $key.pgroup;
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

    let qmsgOptions = {
      msg: ''
    };

    if (this.to) {
      qmsgOptions.qq = this.to;
    }

    if (this.use) {
      qmsgOptions.bot = this.use;
    }

    if (sendOptions.customOptions) {
      qmsgOptions = sendOptions.customOptions;
    } else {
      qmsgOptions = {
        msg: sendOptions.message
      };
    }

    if (sendOptions.extraOptions) {
      qmsgOptions = { ...qmsgOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions = {
      url: `${this.baseURL[this.type]}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: tool.queryStringify(qmsgOptions)
    };

    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    return axios__default["default"](axiosOptions).then(response => {
      if (response.data) {
        if (response.data.success) {
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
      workWeixinOptions = { ...workWeixinOptions,
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

var _baseURL = /*#__PURE__*/new WeakMap();

class Chanify {
  constructor({
    token,
    baseURL,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);

    _classPrivateFieldInitSpec(this, _baseURL, {
      writable: true,
      value: 'https://api.chanify.net/v1/sender/'
    });

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
      _classPrivateFieldSet(this, _baseURL, $key.baseURL);
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
      chanifyOptions = { ...chanifyOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions = {
      url: `${_classPrivateFieldGet(this, _baseURL)}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: tool.queryStringify(chanifyOptions)
    };

    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    return axios__default["default"](axiosOptions).then(response => {
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

var _baseURL2 = /*#__PURE__*/new WeakMap();

class Bark {
  constructor({
    token,
    baseURL,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);

    _classPrivateFieldInitSpec(this, _baseURL2, {
      writable: true,
      value: 'https://api.day.app/push'
    });

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
      _classPrivateFieldSet(this, _baseURL2, $key.baseURL);
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
      barkOptions = { ...barkOptions,
        ...sendOptions.extraOptions
      };
    }

    if (!barkOptions.device_key) {
      barkOptions.device_key = this._KEY;
    }

    const axiosOptions = {
      url: _classPrivateFieldGet(this, _baseURL2),
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      data: barkOptions
    };

    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    return axios__default["default"](axiosOptions).then(response => {
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

    let googleChatOptions;

    if (sendOptions.customOptions) {
      googleChatOptions = sendOptions.customOptions;
    } else {
      googleChatOptions = {
        text: sendOptions.message
      };
    }

    if (sendOptions.extraOptions) {
      googleChatOptions = { ...googleChatOptions,
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

    return axios__default["default"](axiosOptions).then(response => {
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

class PushApi {
  constructor(PushApiConfig) {
    _defineProperty(this, "pushers", []);

    PushApiConfig.forEach(config => {
      switch (config.name.toLowerCase()) {
        case 'serverchanturbo':
        case 'serverchan':
          this.pushers.push({
            name: config.name,
            pusher: new ServerChanTurbo.ServerChanTurbo(config.config)
          });
          break;

        case 'pushdeer':
          this.pushers.push({
            name: config.name,
            pusher: new PushDeer.PushDeer(config.config)
          });
          break;

        case 'telegrambot':
          this.pushers.push({
            name: config.name,
            pusher: new TelegramBot.TelegramBot(config.config)
          });
          break;

        case 'dingtalk':
          this.pushers.push({
            name: config.name,
            pusher: new DingTalk.DingTalk(config.config)
          });
          break;

        case 'wxpusher':
          this.pushers.push({
            name: config.name,
            pusher: new WxPusher.WxPusher(config.config)
          });
          break;

        case 'mail':
          this.pushers.push({
            name: config.name,
            pusher: new Mail.Mail(config.config)
          });
          break;

        case 'feishu':
          this.pushers.push({
            name: config.name,
            pusher: new FeiShu.FeiShu(config.config)
          });
          break;

        case 'workweixin':
          this.pushers.push({
            name: config.name,
            pusher: new WorkWeixin.WorkWeixin(config.config)
          });
          break;

        case 'qqchannel':
          this.pushers.push({
            name: config.name,
            pusher: new QqChannel.QqChannel(config.config)
          });
          break;

        case 'pushplus':
          this.pushers.push({
            name: config.name,
            pusher: new PushPlus.PushPlus(config.config)
          });
          break;

        case 'showdoc':
          this.pushers.push({
            name: config.name,
            pusher: new Showdoc.Showdoc(config.config)
          });
          break;

        case 'xizhi':
          this.pushers.push({
            name: config.name,
            pusher: new Xizhi.Xizhi(config.config)
          });
          break;

        case 'discord':
          this.pushers.push({
            name: config.name,
            pusher: new Discord.Discord(config.config)
          });
          break;

        case 'gocqhttp':
          this.pushers.push({
            name: config.name,
            pusher: new GoCqhttp.GoCqhttp(config.config)
          });
          break;

        case 'qmsg':
          this.pushers.push({
            name: config.name,
            pusher: new Qmsg(config.config)
          });
          break;

        case 'workweixinbot':
          this.pushers.push({
            name: config.name,
            pusher: new WorkWeixinBot(config.config)
          });
          break;

        case 'chanify':
          this.pushers.push({
            name: config.name,
            pusher: new Chanify(config.config)
          });
          break;

        case 'bark':
          this.pushers.push({
            name: config.name,
            pusher: new Bark(config.config)
          });
          break;

        case 'googlechat':
          this.pushers.push({
            name: config.name,
            pusher: new GoogleChat(config.config)
          });
          break;
      }
    });
  }

  async send(sendOptions) {
    return Promise.allSettled(this.pushers.map(async pusher => {
      if (!Array.isArray(sendOptions)) {
        return {
          name: pusher.name,
          result: await pusher.pusher.send(sendOptions)
        };
      }

      const sendOption = sendOptions.find(option => option.name === pusher.name || option.name === 'default');

      if (sendOption) {
        return {
          name: pusher.name,
          result: await pusher.pusher.send(sendOption.options)
        };
      }

      return {
        name: pusher.name,
        result: {
          status: 10,
          statusText: 'Missing Options',
          extraMessage: sendOptions
        }
      };
    })) // @ts-ignore
    .then(resusts => resusts.map((result, index) => result.value || {
      name: this.pushers[index].name,
      result: {
        status: 11,
        statusText: 'Unknown Error',
        // @ts-ignore
        extraMessage: result.reason
      }
    }));
  }

}

exports.PushApi = PushApi;
