import { Config } from 'qq-guild-bot';
declare class QqChannel {
    #private;
    protected _CONFIG: Config;
    channelID?: string;
    constructor({ key, channelID }: QqChannelConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { QqChannel };
