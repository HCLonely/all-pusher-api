import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { proxy, result } from './tool';
interface CustomConfig {
    url: string;
    method?: string;
    contentType?: string;
    headers?: AxiosRequestHeaders;
    success: {
        key: string;
        value: any;
    };
    key?: {
        url: string;
        method?: string;
        contentType?: string;
        headers?: AxiosRequestHeaders;
        success: {
            key: string;
            value: any;
        };
    };
    proxy?: proxy;
}
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
