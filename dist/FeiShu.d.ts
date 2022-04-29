import { AxiosRequestConfig } from 'axios';
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
