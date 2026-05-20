import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface QQBotConfig {
    key?: {
        appId: string;
        appSecret: string;
        userId?: string;
        groupId?: string;
        channelId?: string;
        guildId?: string;
        baseUrl?: string;
    };
    appId?: string;
    appSecret?: string;
    userId?: string;
    groupId?: string;
    channelId?: string;
    guildId?: string;
    baseUrl?: string;
    proxy?: proxy;
}
declare class QQBot {
    #private;
    protected _APP_ID: string;
    protected _CLIENT_SECRET: string;
    protected _TOKEN?: string;
    protected _TOKEN_EXPIRE_AT: number;
    readonly tokenURL = "https://bots.qq.com/app/getAppAccessToken";
    readonly baseUrl: string;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    userId?: string;
    groupId?: string;
    channelId?: string;
    guildId?: string;
    constructor({ appId, appSecret, userId, groupId, channelId, baseUrl, key, proxy }: QQBotConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { QQBot };
