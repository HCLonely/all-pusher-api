import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface DiscordConfig {
    webhook?: string;
    key?: {
        webhook: string;
    };
    proxy?: proxy;
}
declare class Discord {
    protected _WEBHOOK: string;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ webhook, key, proxy }: DiscordConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Discord };
