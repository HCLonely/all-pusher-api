import { proxy, result, sendOptions } from './tool';
interface TransportOptions {
    host: string;
    port: number;
    secure?: boolean;
    auth: {
        user: string;
        pass: string;
    };
    proxy?: string;
}
interface MailConfig {
    key: TransportOptions;
    options?: {
        from: string;
        to?: string;
    };
    proxy?: proxy;
}
interface mailOptions {
    from: string;
    to?: string;
}
declare class Mail {
    protected _SERVER: TransportOptions;
    options?: mailOptions;
    constructor({ key, options, proxy }: MailConfig);
    send(sendOptions: sendOptions): Promise<result>;
}
export { Mail };
