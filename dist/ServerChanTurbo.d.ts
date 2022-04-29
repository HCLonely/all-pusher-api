import { AxiosRequestConfig } from 'axios';
declare class ServerChanTurbo {
    protected _KEY: string;
    readonly baseURL = "https://sctapi.ftqq.com/";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: ServerChanTurboConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { ServerChanTurbo };
