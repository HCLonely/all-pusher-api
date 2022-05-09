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
import { result, sendOptions } from './tool';
declare class PushApi {
    pushers: Array<{
        name: string;
        pusher: ServerChanTurbo | PushDeer | TelegramBot | DingTalk | WxPusher | Mail | FeiShu | WorkWeixin | QqChannel | PushPlus | Showdoc | Xizhi | Discord | GoCqhttp;
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