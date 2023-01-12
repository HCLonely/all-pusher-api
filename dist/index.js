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

var Qmsg = require('./Qmsg');

var WorkWeixinBot = require('./WorkWeixinBot');

var Chanify = require('./Chanify');

var Bark = require('./Bark');

var GoogleChat = require('./GoogleChat');

var Push = require('./Push');

var Slack = require('./Slack');

var Pushback = require('./Pushback');

var Zulip = require('./Zulip');

var RocketChat = require('./RocketChat');

var Gitter = require('./Gitter');

var axios = require('axios');

var tool = require('./tool');

var showdown = require('showdown');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {
    'default': e
  };
}

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

var showdown__default = /*#__PURE__*/_interopDefaultLegacy(showdown);

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

    let pushoverOptions;

    if (sendOptions.customOptions) {
      pushoverOptions = sendOptions.customOptions;
    } else {
      pushoverOptions = {
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
        message: sendOptions.message
      };

      if (['html', 'markdown'].includes(sendOptions.type || '')) {
        pushoverOptions.html = 1;
      }

      if (sendOptions.type === 'markdown') {
        // @ts-ignore
        pushoverOptions.message = new showdown__default["default"]().Converter().makeHtml(sendOptions.message);
      }
    }

    if (sendOptions.extraOptions) {
      pushoverOptions = { ...pushoverOptions,
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

    return axios__default["default"](axiosOptions).then(response => {
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
      iyuuOptions = { ...iyuuOptions,
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

    return axios__default["default"](axiosOptions).then(response => {
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

var _baseURL = /*#__PURE__*/new WeakMap();

class Ntfy {
  constructor({
    token,
    baseURL,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);

    _classPrivateFieldInitSpec(this, _baseURL, {
      writable: true,
      value: 'https://ntfy.sh/'
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
      ntfyOptions = { ...ntfyOptions,
        ...sendOptions.extraOptions
      };
    }

    const axiosOptions = {
      url: `${_classPrivateFieldGet(this, _baseURL)}`,
      method: 'POST',
      data: JSON.stringify(ntfyOptions)
    };

    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    return axios__default["default"](axiosOptions).then(response => {
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

    _defineProperty(this, "baseURL", 'https://www.phprm.com/services/push/trigger/');

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
      yiFengChuanHuaOptions = { ...yiFengChuanHuaOptions,
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

    return axios__default["default"](axiosOptions).then(response => {
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
            pusher: new Qmsg.Qmsg(config.config)
          });
          break;

        case 'workweixinbot':
          this.pushers.push({
            name: config.name,
            pusher: new WorkWeixinBot.WorkWeixinBot(config.config)
          });
          break;

        case 'chanify':
          this.pushers.push({
            name: config.name,
            pusher: new Chanify.Chanify(config.config)
          });
          break;

        case 'bark':
          this.pushers.push({
            name: config.name,
            pusher: new Bark.Bark(config.config)
          });
          break;

        case 'googlechat':
          this.pushers.push({
            name: config.name,
            pusher: new GoogleChat.GoogleChat(config.config)
          });
          break;

        case 'push':
          this.pushers.push({
            name: config.name,
            pusher: new Push.Push(config.config)
          });
          break;

        case 'slack':
          this.pushers.push({
            name: config.name,
            pusher: new Slack.Slack(config.config)
          });
          break;

        case 'pushback':
          this.pushers.push({
            name: config.name,
            pusher: new Pushback.Pushback(config.config)
          });
          break;

        case 'zulip':
          this.pushers.push({
            name: config.name,
            pusher: new Zulip.Zulip(config.config)
          });
          break;

        case 'rocketchat':
          this.pushers.push({
            name: config.name,
            pusher: new RocketChat.RocketChat(config.config)
          });
          break;

        case 'gitter':
          this.pushers.push({
            name: config.name,
            pusher: new Gitter.Gitter(config.config)
          });
          break;

        case 'pushover':
          this.pushers.push({
            name: config.name,
            pusher: new Pushover(config.config)
          });
          break;

        case 'iyuu':
          this.pushers.push({
            name: config.name,
            pusher: new Iyuu(config.config)
          });
          break;

        case 'ntfy':
          this.pushers.push({
            name: config.name,
            pusher: new Ntfy(config.config)
          });
          break;

        case 'yifengchuanhua':
          this.pushers.push({
            name: config.name,
            pusher: new YiFengChuanHua(config.config)
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
