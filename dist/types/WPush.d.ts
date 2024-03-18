import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface WPushConfig {
    token?: string;
    key?: {
        token: string;
    };
    proxy?: proxy;
}
declare class WPush {
    protected _KEY: string;
    readonly baseURL = "https://api.wpush.cn/api/v1/send";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: WPushConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { WPush };
