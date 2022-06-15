import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface GitterConfig {
    key?: {
        token: string;
        roomId?: string;
    };
    token?: string;
    roomId?: string;
    proxy?: proxy;
}
declare class Gitter {
    protected _KEY: string;
    protected _ROOM_ID: string;
    protected _BASE_URL: string;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, roomId, key, proxy }: GitterConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Gitter };
