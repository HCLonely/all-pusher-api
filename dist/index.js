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
var PushPlus = require('./PushPlus');
var Showdoc = require('./Showdoc');
var Xizhi = require('./Xizhi');
var Discord = require('./Discord');
var GoCqhttp = require('./GoCqhttp');
var WorkWeixinBot = require('./WorkWeixinBot');
var Chanify = require('./Chanify');
var Bark = require('./Bark');
var GoogleChat = require('./GoogleChat');
var Push = require('./Push');
var Slack = require('./Slack');
var Pushback = require('./Pushback');
var Zulip = require('./Zulip');
var RocketChat = require('./RocketChat');
var Pushover = require('./Pushover');
var Iyuu = require('./Iyuu');
var Ntfy = require('./Ntfy');
var YiFengChuanHua = require('./YiFengChuanHua');
var WPush = require('./WPush');
var PushBullet = require('./PushBullet');
var SimplePush = require('./SimplePush');
var PushMe = require('./PushMe');
var QQBot = require('./QQBot');
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
  // qqchannel: QqChannel,
  pushplus: PushPlus.PushPlus,
  showdoc: Showdoc.Showdoc,
  xizhi: Xizhi.Xizhi,
  discord: Discord.Discord,
  gocqhttp: GoCqhttp.GoCqhttp,
  // qmsg: Qmsg,
  workweixinbot: WorkWeixinBot.WorkWeixinBot,
  chanify: Chanify.Chanify,
  bark: Bark.Bark,
  googlechat: GoogleChat.GoogleChat,
  push: Push.Push,
  slack: Slack.Slack,
  pushback: Pushback.Pushback,
  zulip: Zulip.Zulip,
  rocketchat: RocketChat.RocketChat,
  // gitter: Gitter,
  pushover: Pushover.Pushover,
  iyuu: Iyuu.Iyuu,
  ntfy: Ntfy.Ntfy,
  yifengchuanhua: YiFengChuanHua.YiFengChuanHua,
  wpush: WPush.WPush,
  pushbullet: PushBullet.PushBullet,
  simplepush: SimplePush.SimplePush,
  // anpush: AnPush
  pushme: PushMe.PushMe,
  qqbot: QQBot.QQBot
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
