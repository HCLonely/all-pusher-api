import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface PushoverConfig {
    key?: {
        token: string;
        user: string;
    };
    user?: string;
    token?: string;
    proxy?: proxy;
}
declare class Pushover {
    protected _KEY: string;
    readonly baseURL = "https://api.pushover.net/1/messages.json";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    protected _USER: string;
    constructor({ token, user, key, proxy }: PushoverConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Pushover };
