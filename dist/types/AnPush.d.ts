import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface AnPushConfig {
    key?: {
        token: string;
        channel?: string;
    };
    token?: string;
    channel?: string;
    proxy?: proxy;
}
declare class AnPush {
    protected _KEY: string;
    readonly baseURL = "https://api.anpush.com/push/";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    channel: string;
    constructor({ token, key, channel, proxy }: AnPushConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { AnPush };
