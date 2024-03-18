import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface RocketChatConfig {
    key?: {
        webhook: string;
    };
    webhook?: string;
    proxy?: proxy;
}
declare class RocketChat {
    protected _WEBHOOK: string;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ webhook, key, proxy }: RocketChatConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { RocketChat };
