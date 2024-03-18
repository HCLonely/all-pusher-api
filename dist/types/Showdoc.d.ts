import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface ShowdocConfig {
    token?: string;
    key?: {
        token: string;
    };
    proxy?: proxy;
}
declare class Showdoc {
    protected _KEY: string;
    readonly baseURL = "https://push.showdoc.com.cn/server/api/push/";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: ShowdocConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Showdoc };
