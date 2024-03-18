import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface IGotConfig {
    key?: {
        token: string;
    };
    token?: string;
    proxy?: proxy;
}
declare class IGot {
    protected _KEY: string;
    readonly baseURL = "https://push.hellyw.com/";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: IGotConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { IGot };
