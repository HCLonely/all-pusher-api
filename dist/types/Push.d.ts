import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface PushConfig {
    key?: {
        token: string;
        baseURL?: string;
    };
    baseURL?: string;
    token?: string;
    proxy?: proxy;
}
declare class Push {
    protected _KEY: string;
    protected _BASE_URL: string;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, baseURL, key, proxy }: PushConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Push };
