import { AxiosRequestConfig } from 'axios';
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
