import { AxiosRequestConfig } from 'axios';
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
