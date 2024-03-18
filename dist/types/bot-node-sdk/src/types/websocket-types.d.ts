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
    DISPATCH = 0,// 服务端进行消息推送
    HEARTBEAT = 1,// 客户端发送心跳
    IDENTIFY = 2,// 鉴权
    RESUME = 6,// 恢复连接
    RECONNECT = 7,// 服务端通知客户端重连
    INVALID_SESSION = 9,// 当identify或resume的时候，如果参数有错，服务端会返回该消息
    HELLO = 10,// 当客户端与网关建立ws连接之后，网关下发的第一条消息
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
    INVALID_OPCODE = 4001,// 无效的opcode
    INVALID_PAYLOAD = 4002,// 无效的payload
    ERROR_SEQ = 4007,// seq错误
    TOO_FAST_PAYLOAD = 4008,// 发送 payload 过快，请重新连接，并遵守连接后返回的频控信息
    EXPIRED = 4009,// 连接过期，请重连
    INVALID_SHARD = 4010,// 无效的shard
    TOO_MACH_GUILD = 4011,// 连接需要处理的guild过多，请进行合理分片
    INVALID_VERSION = 4012,// 无效的version
    INVALID_INTENTS = 4013,// 无效的intent
    DISALLOWED_INTENTS = 4014,// intent无权限
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
export type IntentEventsMapType = {
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
