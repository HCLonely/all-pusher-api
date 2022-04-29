import { AxiosRequestConfig } from 'axios';
declare class PushDeer {
    protected _KEY: string;
    readonly baseURL = "https://api2.pushdeer.com/message/push";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: PushDeerConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { PushDeer };
