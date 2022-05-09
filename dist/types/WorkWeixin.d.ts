import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface WorkWeixinConfig {
    key?: {
        corpid: string;
        secret: string;
        agentid: number;
        touser?: string;
    };
    corpid?: string;
    secret?: string;
    agentid?: number;
    touser?: string;
    proxy?: proxy;
}
declare class WorkWeixin {
    #private;
    protected _CORPID: string;
    protected _SECRET: string;
    protected _AGENT_ID: number;
    protected _TOKEN?: string;
    readonly baseURL = "https://qyapi.weixin.qq.com/cgi-bin/message/send";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    touser?: string;
    constructor({ corpid, secret, agentid, touser, key, proxy }: WorkWeixinConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { WorkWeixin };
