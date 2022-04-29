import { AxiosRequestConfig } from 'axios';
declare const queryStringify: (data: objectData) => string;
declare const proxy2httpsAgent: (proxy: proxy, protocol?: string) => AxiosRequestConfig['httpsAgent'] | null;
export { queryStringify, proxy2httpsAgent };
