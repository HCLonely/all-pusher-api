import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface NotifyXConfig {
    token?: string;
    key?: {
        token: string;
    };
    proxy?: proxy;
}
declare class NotifyX {
    protected _KEY: string;
    readonly baseURL = "https://www.notifyx.cn/api/v1/send/";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: NotifyXConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { NotifyX };
