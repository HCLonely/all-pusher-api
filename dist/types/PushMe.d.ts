import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface PushMeConfig {
    key?: {
        token: string;
        baseURL?: string;
    };
    token?: string;
    baseURL?: string;
    proxy?: proxy;
}
declare class PushMe {
    #private;
    protected _KEY: string;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, baseURL, key, proxy }: PushMeConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { PushMe };
