import { AxiosRequestConfig } from 'axios';
declare class Discord {
    protected _WEBHOOK: string;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
    constructor({ webhook, key, proxy }: DiscordConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Discord };
