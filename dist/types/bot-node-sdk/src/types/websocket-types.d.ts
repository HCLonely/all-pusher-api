export interface wsResData {
    op: number;
    d?: {
        heartbeat_interval?: number;
    };
    s: number;
    t: string;
}
export interface HeartbeatParam {
    op: number;
    d: number;
}
export interface EventTypes {
    eventType: string;
    eventMsg?: object;
}
export interface GetWsParam {
    appID: string;
    token: string;
    sandbox?: boolean;
    shards?: Array<number>;
    intents?: Array<AvailableIntentsEventsEnum>;
    maxRetry?: number;
}
export interface WsAddressObj {
    url: string;
    shards: number;
    session_start_limit: {
        total: number;
        remaining: number;
        reset_after: number;
        max_concurrency: number;
    };
}
export interface WsDataInfo {
    data: WsAddressObj;
}
export interface SessionRecord {
    sessionID: string;
    seq: number;
}
export declare enum OpCode {
    DISPATCH = 0,
    HEARTBEAT = 1,
    IDENTIFY = 2,
    RESUME = 6,
    RECONNECT = 7,
    INVALID_SESSION = 9,
    HELLO = 10,
    HEARTBEAT_ACK = 11
}
export declare enum AvailableIntentsEventsEnum {
    GUILDS = "GUILDS",
    GUILD_MEMBERS = "GUILD_MEMBERS",
    GUILD_MESSAGES = "GUILD_MESSAGES",
    GUILD_MESSAGE_REACTIONS = "GUILD_MESSAGE_REACTIONS",
    DIRECT_MESSAGE = "DIRECT_MESSAGE",
    FORUM_EVENT = "FORUM_EVENT",
    AUDIO_ACTION = "AUDIO_ACTION",
    AT_MESSAGES = "AT_MESSAGES",
    MESSAGE_AUDIT = "MESSAGE_AUDIT"
}
export declare const WsEventType: {
    [key: string]: AvailableIntentsEventsEnum;
};
export declare const WSCodes: {
    1000: string;
    4004: string;
    4010: string;
    4011: string;
    4013: string;
    4014: string;
};
export declare const enum WebsocketCode {
    INVALID_OPCODE = 4001,
    INVALID_PAYLOAD = 4002,
    ERROR_SEQ = 4007,
    TOO_FAST_PAYLOAD = 4008,
    EXPIRED = 4009,
    INVALID_SHARD = 4010,
    TOO_MACH_GUILD = 4011,
    INVALID_VERSION = 4012,
    INVALID_INTENTS = 4013,
    DISALLOWED_INTENTS = 4014,
    ERROR = 4900
}
export declare const WebsocketCloseReason: ({
    code: number;
    reason: string;
    resume?: undefined;
} | {
    code: number;
    reason: string;
    resume: boolean;
})[];
export declare type IntentEventsMapType = {
    [key in AvailableIntentsEventsEnum]: number;
};
export declare const IntentEvents: IntentEventsMapType;
export declare const Intents: {
    GUILDS: number;
    GUILD_MEMBERS: number;
    GUILD_BANS: number;
    GUILD_EMOJIS: number;
    GUILD_INTEGRATIONS: number;
    GUILD_WEBHOOKS: number;
    GUILD_INVITES: number;
    GUILD_VOICE_STATES: number;
    GUILD_PRESENCES: number;
    GUILD_MESSAGES: number;
    GUILD_MESSAGE_REACTIONS: number;
    GUILD_MESSAGE_TYPING: number;
    DIRECT_MESSAGES: number;
    DIRECT_MESSAGE_REACTIONS: number;
    DIRECT_MESSAGE_TYPING: number;
};
export declare const SessionEvents: {
    CLOSED: string;
    READY: string;
    ERROR: string;
    INVALID_SESSION: string;
    RECONNECT: string;
    DISCONNECT: string;
    EVENT_WS: string;
    RESUMED: string;
    DEAD: string;
};
export declare const WsObjRequestOptions: (sandbox: boolean) => {
    method: "GET";
    url: string;
    headers: {
        Accept: string;
        'Accept-Encoding': string;
        'Accept-Language': string;
        Connection: string;
        'User-Agent': string;
        Authorization: string;
    };
};
