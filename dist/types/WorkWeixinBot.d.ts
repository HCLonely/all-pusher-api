import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface WorkWeixinBotConfig {
    key?: {
        webhook: string;
    };
    webhook?: string;
    proxy?: proxy;
}
declare class WorkWeixinBot {
    protected _WEBHOOK: string;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ webhook, key, proxy }: WorkWeixinBotConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { WorkWeixinBot };
