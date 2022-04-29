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
