import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface ZulipConfig {
    key?: {
        site?: string;
        token: string;
        email: string;
        to?: string | Array<number | string>;
    };
    site?: string;
    token?: string;
    domain?: string;
    email?: string;
    to?: string | Array<number | string>;
    proxy?: proxy;
}
declare class Zulip {
    #private;
    protected _KEY: string;
    protected _EMAIL: string;
    to?: string | Array<number | string>;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ site, token, to, email, key, proxy }: ZulipConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Zulip };
