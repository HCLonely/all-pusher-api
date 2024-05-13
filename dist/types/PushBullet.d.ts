import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface PushBulletConfig {
    key?: {
        token: string;
    };
    token?: string;
    proxy?: proxy;
}
declare class PushBullet {
    protected _KEY: string;
    readonly baseURL = "https://api.pushbullet.com/v2/pushes";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, key, proxy }: PushBulletConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { PushBullet };
