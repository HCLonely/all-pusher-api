'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
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
var axios = require('axios');
var tool = require('./tool');
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
class AnPush {
  constructor({
    token,
    key,
    channel,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://api.anpush.com/push/');
    _defineProperty(this, "httpsAgent", void 0);
    _defineProperty(this, "channel", void 0);
    const $key = {
      token,
      channel,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    if ($key.channel) {
      this.channel = $key.channel;
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
    let anPushOptions;
    if (sendOptions.customOptions) {
      anPushOptions = sendOptions.customOptions;
    } else {
      anPushOptions = {
        channel: this.channel,
        content: sendOptions.message,
        title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10)
      };
    }
    if (sendOptions.extraOptions) {
      anPushOptions = {
        ...anPushOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: `${this.baseURL}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: anPushOptions
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
            pusher: new Pushover.Pushover(config.config)
          });
          break;
        case 'iyuu':
          this.pushers.push({
            name: config.name,
            pusher: new Iyuu.Iyuu(config.config)
          });
          break;
        case 'ntfy':
          this.pushers.push({
            name: config.name,
            pusher: new Ntfy.Ntfy(config.config)
          });
          break;
        case 'yifengchuanhua':
          this.pushers.push({
            name: config.name,
            pusher: new YiFengChuanHua.YiFengChuanHua(config.config)
          });
          break;
        case 'wpush':
          this.pushers.push({
            name: config.name,
            pusher: new WPush.WPush(config.config)
          });
          break;
        case 'pushbullet':
          this.pushers.push({
            name: config.name,
            pusher: new PushBullet(config.config)
          });
          break;
        case 'simplepush':
          this.pushers.push({
            name: config.name,
            pusher: new SimplePush(config.config)
          });
          break;
        case 'anpush':
          this.pushers.push({
            name: config.name,
            pusher: new AnPush(config.config)
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
    }))
    // @ts-ignore
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
