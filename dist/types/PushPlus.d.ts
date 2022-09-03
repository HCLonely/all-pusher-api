import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface PushPlusConfig {
    token?: string;
    key?: {
        token: string;
    };
    proxy?: proxy;
}
declare class PushPlus {
    protected _KEY: string;
    readonly baseURL = "http://www.pushplus.plus/send";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: PushPlusConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { PushPlus };
