import { AxiosRequestConfig } from 'axios';
declare class Xizhi {
    protected _KEY: string;
    readonly baseURL = "https://xizhi.qqoq.net/";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: XizhiConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Xizhi };
