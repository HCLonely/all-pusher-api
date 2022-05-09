import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface PushDeerConfig {
    token?: string;
    key?: {
        token: string;
    };
    proxy?: proxy;
}
declare class PushDeer {
    protected _KEY: string;
    readonly baseURL = "https://api2.pushdeer.com/message/push";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: PushDeerConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { PushDeer };
