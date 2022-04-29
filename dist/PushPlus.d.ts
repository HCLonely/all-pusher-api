import { AxiosRequestConfig } from 'axios';
declare class PushPlus {
    protected _KEY: string;
    readonly baseURL = "https://pushplus.hxtrip.com/send/";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: PushPlusConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { PushPlus };
