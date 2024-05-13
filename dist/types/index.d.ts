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
import { AnPush } from './AnPush';
import { result, sendOptions } from './tool';
declare class PushApi {
    pushers: Array<{
        name: string;
        pusher: ServerChanTurbo | PushDeer | TelegramBot | DingTalk | WxPusher | Mail | FeiShu | WorkWeixin | QqChannel | PushPlus | Showdoc | Xizhi | Discord | GoCqhttp | Qmsg | WorkWeixinBot | Chanify | Bark | GoogleChat | Push | Slack | Pushback | Zulip | RocketChat | Gitter | Pushover | Iyuu | Ntfy | YiFengChuanHua | WPush | PushBullet | SimplePush | AnPush;
    }>;
    constructor(PushApiConfig: Array<{
        name: string;
        config: any;
    }>);
    send(sendOptions: Array<{
        name: string;
        options: sendOptions;
    }> | sendOptions): Promise<Array<{
        name: string;
        result: result;
    }>>;
}
export { PushApi };
