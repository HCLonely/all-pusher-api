import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface SimplePushConfig {
    key?: {
        token: string;
    };
    token?: string;
    proxy?: proxy;
}
declare class SimplePush {
    protected _KEY: string;
    readonly baseURL = "https://api.simplepush.io/send";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: SimplePushConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { SimplePush };
