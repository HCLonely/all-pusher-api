import { proxy } from './tool';
interface QQBotEventConfig {
    appId: string;
    appSecret: string;
    intents?: number;
    shard?: [number, number];
    proxy?: proxy;
    baseUrl?: string;
}
declare const INTENTS_MAP: Record<string, number>;
declare class QQBotEvent {
    #private;
    private appId;
    private appSecret;
    private intents;
    private shard;
    private baseUrl;
    private httpsAgent?;
    private token?;
    private tokenExpireAt;
    private ws?;
    private sessionId?;
    private lastSeq;
    private heartbeatInterval?;
    private heartbeatMs;
    constructor(config: QQBotEventConfig);
    start(): Promise<void>;
    stop(): void;
    static parseIntents(keys: string[]): number;
    static listIntents(): void;
}
export { QQBotEvent, INTENTS_MAP };
