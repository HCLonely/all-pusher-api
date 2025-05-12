'use strict';

var _classPrivateFieldGet = require("@babel/runtime/helpers/classPrivateFieldGet");
var _classPrivateFieldSet = require("@babel/runtime/helpers/classPrivateFieldSet");
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
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
var Pushover = require('./Pushover');
var Iyuu = require('./Iyuu');
var Ntfy = require('./Ntfy');
var YiFengChuanHua = require('./YiFengChuanHua');
var WPush = require('./WPush');
var PushBullet = require('./PushBullet');
var axios = require('axios');
var tool = require('./tool');
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
var _baseURL = /*#__PURE__*/new WeakMap();
class PushMe {
  constructor({
    token,
    baseURL,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _classPrivateFieldInitSpec(this, _baseURL, {
      writable: true,
      value: 'https://push.i-i.me'
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
      url: `${_classPrivateFieldGet(this, _baseURL)}`,
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
const pusherMap = {
  serverchanturbo: ServerChanTurbo.ServerChanTurbo,
  serverchan: ServerChanTurbo.ServerChanTurbo,
  pushdeer: PushDeer.PushDeer,
  telegrambot: TelegramBot.TelegramBot,
  dingtalk: DingTalk.DingTalk,
  wxpusher: WxPusher.WxPusher,
  mail: Mail.Mail,
  feishu: FeiShu.FeiShu,
  workweixin: WorkWeixin.WorkWeixin,
  qqchannel: QqChannel.QqChannel,
  pushplus: PushPlus.PushPlus,
  showdoc: Showdoc.Showdoc,
  xizhi: Xizhi.Xizhi,
  discord: Discord.Discord,
  gocqhttp: GoCqhttp.GoCqhttp,
  qmsg: Qmsg.Qmsg,
  workweixinbot: WorkWeixinBot.WorkWeixinBot,
  chanify: Chanify.Chanify,
  bark: Bark.Bark,
  googlechat: GoogleChat.GoogleChat,
  push: Push.Push,
  slack: Slack.Slack,
  pushback: Pushback.Pushback,
  zulip: Zulip.Zulip,
  rocketchat: RocketChat.RocketChat,
  gitter: Gitter.Gitter,
  pushover: Pushover.Pushover,
  iyuu: Iyuu.Iyuu,
  ntfy: Ntfy.Ntfy,
  yifengchuanhua: YiFengChuanHua.YiFengChuanHua,
  wpush: WPush.WPush,
  pushbullet: PushBullet.PushBullet,
  simplepush: SimplePush,
  // anpush: AnPush
  pushme: PushMe
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
exports.PushApi = PushApi;
