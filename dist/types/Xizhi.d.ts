import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface XizhiConfig {
    key?: {
        token: string;
    };
    token?: string;
    proxy?: proxy;
}
declare class Xizhi {
    protected _KEY: string;
    readonly baseURL = "https://xizhi.qqoq.net/";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: XizhiConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Xizhi };
