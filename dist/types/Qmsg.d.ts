import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface QmsgConfig {
    token?: string;
    qq?: number;
    group?: number;
    pqq?: number;
    pgroup?: number;
    bot?: number;
    type?: 'qq' | 'group' | 'pqq' | 'pgroup';
    key?: {
        token?: string;
        qq?: number;
        group?: number;
        pqq?: number;
        pgroup?: number;
        bot?: number;
        type?: 'qq' | 'group' | 'pqq' | 'pgroup';
    };
    proxy?: proxy;
}
declare class Qmsg {
    protected _KEY: string;
    readonly baseURL: {
        qq: string;
        group: string;
        pqq: string;
        pgroup: string;
    };
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    type: 'qq' | 'group' | 'pqq' | 'pgroup';
    to?: number;
    use?: number;
    constructor({ token, bot, type, qq, group, pqq, pgroup, key, proxy }: QmsgConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Qmsg };
