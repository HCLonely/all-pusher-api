import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface BarkConfig {
    key?: {
        token: string;
        baseURL?: string;
    };
    baseURL?: string;
    token?: string;
    proxy?: proxy;
}
declare class Bark {
    #private;
    protected _KEY: string;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, baseURL, key, proxy }: BarkConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Bark };
