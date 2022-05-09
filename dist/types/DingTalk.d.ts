import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface DingTalkConfig {
    token?: string;
    key?: {
        token: string;
        secret?: string;
    };
    proxy?: proxy;
}
declare class DingTalk {
    #private;
    protected _KEY: string;
    protected _SECRET?: string;
    readonly baseURL = "https://oapi.dingtalk.com/robot/send";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: DingTalkConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { DingTalk };
