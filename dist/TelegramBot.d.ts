import { AxiosRequestConfig } from 'axios';
declare class TelegramBot {
    protected _KEY: string;
    protected _CHAT_ID: string;
    readonly baseURL = "https://api.telegram.org/bot";
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ token, chat_id, key, proxy }: TelegramBotConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { TelegramBot };
