import { Config } from './bot-node-sdk/src';
import { result, sendOptions } from './tool';
interface QqChannelConfig {
    key: Config;
    channelID: string;
}
declare class QqChannel {
    #private;
    protected _CONFIG: Config;
    channelID?: string;
    constructor({ key, channelID }: QqChannelConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { QqChannel };
