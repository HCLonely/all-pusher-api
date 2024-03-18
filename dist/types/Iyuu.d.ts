import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface IyuuConfig {
    key?: {
        token: string;
    };
    token?: string;
    proxy?: proxy;
}
declare class Iyuu {
    protected _KEY: string;
    readonly baseURL = "https://iyuu.cn/";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: IyuuConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Iyuu };
