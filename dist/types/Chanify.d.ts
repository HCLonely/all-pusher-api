import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface ChanifyConfig {
    key?: {
        token: string;
        baseURL?: string;
    };
    baseURL?: string;
    token?: string;
    proxy?: proxy;
}
declare class Chanify {
    #private;
    protected _KEY: string;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, baseURL, key, proxy }: ChanifyConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Chanify };
