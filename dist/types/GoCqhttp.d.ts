import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface GoCqhttpConfig {
    baseUrl?: string;
    token?: string;
    user_id?: number;
    group_id?: number;
    guild_id?: string;
    channel_id?: string;
    key: {
        baseUrl?: string;
        token?: string;
        user_id?: number;
        group_id?: number;
        guild_id?: string;
        channel_id?: string;
    };
    proxy?: proxy;
}
declare class GoCqhttp {
    protected _KEY?: string;
    protected _BASE_URL: string;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    user_id?: number;
    group_id?: number;
    guild_id?: string;
    channel_id?: string;
    constructor({ baseUrl, token, user_id, group_id, guild_id, channel_id, key, proxy }: GoCqhttpConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { GoCqhttp };
