import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface ServerChanTurboConfig {
    token?: string;
    key?: {
        token: string;
    };
    proxy?: proxy;
}
declare class ServerChanTurbo {
    protected _KEY: string;
    readonly baseURL = "https://sctapi.ftqq.com/";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: ServerChanTurboConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { ServerChanTurbo };
