import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface SlackConfig {
    key?: {
        webhook: string;
    };
    webhook?: string;
    proxy?: proxy;
}
declare class Slack {
    protected _WEBHOOK: string;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ webhook, key, proxy }: SlackConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Slack };
