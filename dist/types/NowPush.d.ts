import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface NowPushConfig {
    key?: {
        token: string;
    };
    token?: string;
    proxy?: proxy;
}
declare class NowPush {
    protected _KEY: string;
    readonly baseURL = "https://www.api.nowpush.app/v3/sendMessage";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: NowPushConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { NowPush };
