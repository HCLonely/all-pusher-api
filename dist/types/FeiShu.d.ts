import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface FeiShuConfig {
    token?: string;
    key?: {
        token: string;
        secret?: string;
    };
    proxy?: proxy;
}
declare class FeiShu {
    #private;
    protected _KEY: string;
    protected _SECRET?: string;
    readonly baseURL = "https://open.feishu.cn/open-apis/bot/v2/hook/";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: FeiShuConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { FeiShu };
