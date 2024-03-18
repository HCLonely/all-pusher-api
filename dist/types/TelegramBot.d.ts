import { AxiosRequestConfig } from 'axios';
import { proxy, result, sendOptions } from './tool';
interface TelegramBotConfig {
    key?: {
        token: string;
        chat_id: string;
    };
    token?: string;
    chat_id?: string;
    proxy?: proxy;
}
declare class TelegramBot {
    protected _KEY: string;
    protected _CHAT_ID: string;
    readonly baseURL = "https://api.telegram.org/bot";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, chat_id, key, proxy }: TelegramBotConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { TelegramBot };
