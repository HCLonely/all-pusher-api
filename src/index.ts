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
import { Pushover } from './Pushover';
import { Iyuu } from './Iyuu';
import { Ntfy } from './Ntfy';
import { YiFengChuanHua } from './YiFengChuanHua';
import { WPush } from './WPush';
import { PushBullet } from './PushBullet';
import { SimplePush } from './SimplePush';
// import { AnPush } from './AnPush';
import { PushMe } from './PushMe';
import { result, sendOptions } from './tool';

type PusherClass = new (config: any) => any; // eslint-disable-line no-unused-vars

const pusherMap: Record<string, PusherClass> = {
  serverchanturbo: ServerChanTurbo,
  serverchan: ServerChanTurbo,
  pushdeer: PushDeer,
  telegrambot: TelegramBot,
  dingtalk: DingTalk,
  wxpusher: WxPusher,
  mail: Mail,
  feishu: FeiShu,
  workweixin: WorkWeixin,
  qqchannel: QqChannel,
  pushplus: PushPlus,
  showdoc: Showdoc,
  xizhi: Xizhi,
  discord: Discord,
  gocqhttp: GoCqhttp,
  qmsg: Qmsg,
  workweixinbot: WorkWeixinBot,
  chanify: Chanify,
  bark: Bark,
  googlechat: GoogleChat,
  push: Push,
  slack: Slack,
  pushback: Pushback,
  zulip: Zulip,
  rocketchat: RocketChat,
  gitter: Gitter,
  pushover: Pushover,
  iyuu: Iyuu,
  ntfy: Ntfy,
  yifengchuanhua: YiFengChuanHua,
  wpush: WPush,
  pushbullet: PushBullet,
  simplepush: SimplePush,
  // anpush: AnPush
  pushme: PushMe
};

interface PushApiConfig {
  name: string;
  config: any;
}

interface SendResult {
  name: string;
  result: result;
}

class PushApi {
  pushers: Array<{ name: string; pusher: any }> = [];

  constructor(configs: PushApiConfig[]) {
    this.pushers = configs
      .map(({ name, config }) => {
        const Pusher = pusherMap[name.toLowerCase()];
        return Pusher ? { name, pusher: new Pusher(config) } : null;
      })
      .filter((pusher): pusher is { name: string; pusher: any } => pusher !== null);
  }

  async send(
    sendOptions: Array<{ name: string; options: sendOptions }> | sendOptions
  ): Promise<SendResult[]> {
    const results = await Promise.allSettled(
      this.pushers.map(async ({ name, pusher }) => {
        try {
          const options = Array.isArray(sendOptions) ?
            sendOptions.find((option) => option.name === name || option.name === 'default')?.options :
            sendOptions;

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
      })
    );

    return results.map((result, index) => (result.status === 'fulfilled' ?
      result.value :
      {
        name: this.pushers[index].name,
        result: {
          status: 11,
          statusText: 'Unknown Error',
          extraMessage: result.reason
        }
      })
    );
  }
}

export { PushApi };
