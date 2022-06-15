import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface PushbackConfig {
    key?: {
        token: string;
        userId: string;
    };
    token?: string;
    userId?: string;
    proxy?: proxy;
}
declare class Pushback {
    protected _KEY: string;
    protected _USER_ID: string;
    protected _BASE_URL: string;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, userId, key, proxy }: PushbackConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Pushback };
