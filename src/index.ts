import { ServerChanTurbo } from './ServerChanTurbo';
import { PushDeer } from './PushDeer';
import { TelegramBot } from './TelegramBot';
import { DingTalk } from './DingTalk';
import { WxPusher } from './WxPusher';
import { Mail } from './Mail';
import { FeiShu } from './FeiShu';
import { WorkWeixin } from './WorkWeixin';
import { QqChannel } from './QqChannel';
import { PushPlus } from './PushPlus';
import { Showdoc } from './Showdoc';
import { Xizhi } from './Xizhi';
import { Discord } from './Discord';
import { GoCqhttp } from './GoCqhttp';
import { Qmsg } from './Qmsg';
import { WorkWeixinBot } from './WorkWeixinBot';
import { Chanify } from './Chanify';
import { Bark } from './Bark';
import { GoogleChat } from './GoogleChat';
import { Push } from './Push';
import { Slack } from './Slack';
import { Pushback } from './Pushback';
import { Zulip } from './Zulip';
import { RocketChat } from './RocketChat';
import { Gitter } from './Gitter';
import { result, sendOptions } from './tool';

class PushApi {
  pushers: Array<{
    name: string,
    pusher: ServerChanTurbo | PushDeer | TelegramBot | DingTalk | WxPusher | Mail | FeiShu | WorkWeixin |
    QqChannel | PushPlus | Showdoc | Xizhi | Discord | GoCqhttp | Qmsg | WorkWeixinBot | Chanify | Bark |
    GoogleChat | Push | Slack | Pushback | Zulip | RocketChat | Gitter
  }> = [];

  constructor(PushApiConfig: Array<{ name: string, config: any }>) {
    PushApiConfig.forEach((config) => {
      switch (config.name.toLowerCase()) {
      case 'serverchanturbo':
      case 'serverchan':
        this.pushers.push({ name: config.name, pusher: new ServerChanTurbo(config.config) });
        break;
      case 'pushdeer':
        this.pushers.push({ name: config.name, pusher: new PushDeer(config.config) });
        break;
      case 'telegrambot':
        this.pushers.push({ name: config.name, pusher: new TelegramBot(config.config) });
        break;
      case 'dingtalk':
        this.pushers.push({ name: config.name, pusher: new DingTalk(config.config) });
        break;
      case 'wxpusher':
        this.pushers.push({ name: config.name, pusher: new WxPusher(config.config) });
        break;
      case 'mail':
        this.pushers.push({ name: config.name, pusher: new Mail(config.config) });
        break;
      case 'feishu':
        this.pushers.push({ name: config.name, pusher: new FeiShu(config.config) });
        break;
      case 'workweixin':
        this.pushers.push({ name: config.name, pusher: new WorkWeixin(config.config) });
        break;
      case 'qqchannel':
        this.pushers.push({ name: config.name, pusher: new QqChannel(config.config) });
        break;
      case 'pushplus':
        this.pushers.push({ name: config.name, pusher: new PushPlus(config.config) });
        break;
      case 'showdoc':
        this.pushers.push({ name: config.name, pusher: new Showdoc(config.config) });
        break;
      case 'xizhi':
        this.pushers.push({ name: config.name, pusher: new Xizhi(config.config) });
        break;
      case 'discord':
        this.pushers.push({ name: config.name, pusher: new Discord(config.config) });
        break;
      case 'gocqhttp':
        this.pushers.push({ name: config.name, pusher: new GoCqhttp(config.config) });
        break;
      case 'qmsg':
        this.pushers.push({ name: config.name, pusher: new Qmsg(config.config) });
        break;
      case 'workweixinbot':
        this.pushers.push({ name: config.name, pusher: new WorkWeixinBot(config.config) });
        break;
      case 'chanify':
        this.pushers.push({ name: config.name, pusher: new Chanify(config.config) });
        break;
      case 'bark':
        this.pushers.push({ name: config.name, pusher: new Bark(config.config) });
        break;
      case 'googlechat':
        this.pushers.push({ name: config.name, pusher: new GoogleChat(config.config) });
        break;
      case 'push':
        this.pushers.push({ name: config.name, pusher: new Push(config.config) });
        break;
      case 'slack':
        this.pushers.push({ name: config.name, pusher: new Slack(config.config) });
        break;
      case 'pushback':
        this.pushers.push({ name: config.name, pusher: new Pushback(config.config) });
        break;
      case 'zulip':
        this.pushers.push({ name: config.name, pusher: new Zulip(config.config) });
        break;
      case 'rocketchat':
        this.pushers.push({ name: config.name, pusher: new RocketChat(config.config) });
        break;
      case 'gitter':
        this.pushers.push({ name: config.name, pusher: new Gitter(config.config) });
        break;
      default:
        break;
      }
    });
  }

  async send(sendOptions: Array<{ name: string, options: sendOptions }> | sendOptions): Promise<Array<{
    name: string
    result: result
  }>> {
    return Promise.allSettled(
      this.pushers.map(async (pusher) => {
        if (!Array.isArray(sendOptions)) {
          return {
            name: pusher.name,
            result: await pusher.pusher.send(sendOptions)
          };
        }
        const sendOption = sendOptions.find((option) => option.name === pusher.name || option.name === 'default');
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
      .then((resusts) => resusts.map((result, index) => result.value || ({
        name: this.pushers[index].name,
        result: {
          status: 11,
          statusText: 'Unknown Error',
          // @ts-ignore
          extraMessage: result.reason
        }
      })));
  }
}

export { PushApi };
