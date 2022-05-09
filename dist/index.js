'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");

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
