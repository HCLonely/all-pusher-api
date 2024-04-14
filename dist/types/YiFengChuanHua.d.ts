import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface YiFengChuanHuaConfig {
    key?: {
        token: string;
    };
    token?: string;
    proxy?: proxy;
}
declare class YiFengChuanHua {
    protected _KEY: string;
    readonly baseURL = "https://www.phprm.com/services/push/send/";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: YiFengChuanHuaConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { YiFengChuanHua };
