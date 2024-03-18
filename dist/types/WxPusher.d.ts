import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface WxPusherConfig {
    key?: {
        token: string;
        uids?: Array<string>;
        topicIds?: Array<number>;
    };
    token?: string;
    uids?: Array<string>;
    topicIds?: Array<number>;
    proxy?: proxy;
}
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
