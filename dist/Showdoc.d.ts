import { AxiosRequestConfig } from 'axios';
declare class Showdoc {
    protected _KEY: string;
    readonly baseURL = "https://push.showdoc.com.cn/server/api/push/";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: ShowdocConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Showdoc };
