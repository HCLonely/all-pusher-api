import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface GoogleChatConfig {
    key?: {
        webhook: string;
    };
    webhook?: string;
    proxy?: proxy;
}
declare class GoogleChat {
    protected _WEBHOOK: string;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ webhook, key, proxy }: GoogleChatConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { GoogleChat };
