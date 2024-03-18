import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface PushDeerConfig {
    token?: string;
    baseURL?: string;
    key?: {
        token: string;
        baseURL?: string;
    };
    proxy?: proxy;
}
declare class PushDeer {
    #private;
    protected _KEY: string;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: PushDeerConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { PushDeer };
