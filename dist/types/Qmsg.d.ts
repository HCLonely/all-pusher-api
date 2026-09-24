import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface QmsgConfig {
    token?: string;
    group?: string;
    key?: {
        token: string;
        group?: string;
    };
    proxy?: proxy;
}
declare class Qmsg {
    protected _KEY: string;
    protected _GROUP?: string;
    readonly baseURL = "https://qmsg.zendee.cn/v3/jsend/";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, group, key, proxy }: QmsgConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Qmsg };
