import { AxiosRequestConfig } from 'axios';
interface objectData {
    [name: string]: any;
}
interface sendOptions {
    message: string;
    title?: string;
    type?: string;
    to?: string;
    customOptions?: any;
    extraOptions?: any;
}
interface result {
    status: number;
    statusText: string;
    extraMessage: any;
}
interface proxy {
    host: string;
    port: number;
    protocol?: string;
    username?: string;
    password?: string;
}
declare const queryStringify: (data: objectData) => string;
declare const proxy2httpsAgent: (proxy: proxy, protocol?: string) => AxiosRequestConfig['httpsAgent'] | null;
export { queryStringify, proxy2httpsAgent, objectData, sendOptions, result, proxy };
