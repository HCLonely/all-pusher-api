import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface NtfyConfig {
    key?: {
        token: string;
        baseURL?: string;
    };
    token?: string;
    baseURL?: string;
    proxy?: proxy;
}
declare class Ntfy {
    #private;
    protected _KEY: string;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, baseURL, key, proxy }: NtfyConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Ntfy };
