import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
declare class Custom {
    protected _URL: string;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    method: string;
    contentType: string;
    protected _HEADERS?: AxiosRequestHeaders;
    success: {
        key: string;
        value: any;
    };
    constructor({ url, method, contentType, headers, key, success, proxy }: CustomConfig);
    send(sendOptions: any): Promise<result>;
}
export { Custom };
