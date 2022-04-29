import { AxiosRequestConfig } from 'axios';
declare class WxPusher {
    protected _KEY: string;
    readonly baseURL = "https://wxpusher.zjiecode.com/api/send/message";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    uids?: Array<string>;
    topicIds?: Array<number>;
    constructor({ token, uids, topicIds, key, proxy }: WxPusherConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { WxPusher };
