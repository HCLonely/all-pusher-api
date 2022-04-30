"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsObjRequestOptions = exports.SessionEvents = exports.Intents = exports.IntentEvents = exports.WebsocketCloseReason = exports.WSCodes = exports.WsEventType = exports.AvailableIntentsEventsEnum = exports.OpCode = void 0;
const openapi_1 = require("../openapi/v1/openapi");
const resource_1 = require("../openapi/v1/resource");
const utils_1 = require("../utils/utils");
// 心跳参数
var OpCode;
(function (OpCode) {
    OpCode[OpCode["DISPATCH"] = 0] = "DISPATCH";
    OpCode[OpCode["HEARTBEAT"] = 1] = "HEARTBEAT";
    OpCode[OpCode["IDENTIFY"] = 2] = "IDENTIFY";
    OpCode[OpCode["RESUME"] = 6] = "RESUME";
    OpCode[OpCode["RECONNECT"] = 7] = "RECONNECT";
    OpCode[OpCode["INVALID_SESSION"] = 9] = "INVALID_SESSION";
    OpCode[OpCode["HELLO"] = 10] = "HELLO";
    OpCode[OpCode["HEARTBEAT_ACK"] = 11] = "HEARTBEAT_ACK";
})(OpCode = exports.OpCode || (exports.OpCode = {}));
// 可使用的intents事件类型
var AvailableIntentsEventsEnum;
(function (AvailableIntentsEventsEnum) {
    AvailableIntentsEventsEnum["GUILDS"] = "GUILDS";
    AvailableIntentsEventsEnum["GUILD_MEMBERS"] = "GUILD_MEMBERS";
    AvailableIntentsEventsEnum["GUILD_MESSAGES"] = "GUILD_MESSAGES";
    AvailableIntentsEventsEnum["GUILD_MESSAGE_REACTIONS"] = "GUILD_MESSAGE_REACTIONS";
    AvailableIntentsEventsEnum["DIRECT_MESSAGE"] = "DIRECT_MESSAGE";
    AvailableIntentsEventsEnum["FORUM_EVENT"] = "FORUM_EVENT";
    AvailableIntentsEventsEnum["AUDIO_ACTION"] = "AUDIO_ACTION";
    AvailableIntentsEventsEnum["AT_MESSAGES"] = "AT_MESSAGES";
    AvailableIntentsEventsEnum["MESSAGE_AUDIT"] = "MESSAGE_AUDIT";
})(AvailableIntentsEventsEnum = exports.AvailableIntentsEventsEnum || (exports.AvailableIntentsEventsEnum = {}));
// OpenAPI传过来的事件类型
exports.WsEventType = {
    //  ======= GUILDS ======
    GUILD_CREATE: AvailableIntentsEventsEnum.GUILDS,
    GUILD_UPDATE: AvailableIntentsEventsEnum.GUILDS,
    GUILD_DELETE: AvailableIntentsEventsEnum.GUILDS,
    CHANNEL_CREATE: AvailableIntentsEventsEnum.GUILDS,
    CHANNEL_UPDATE: AvailableIntentsEventsEnum.GUILDS,
    CHANNEL_DELETE: AvailableIntentsEventsEnum.GUILDS,
    //  ======= GUILD_MEMBERS ======
    GUILD_MEMBER_ADD: AvailableIntentsEventsEnum.GUILD_MEMBERS,
    GUILD_MEMBER_UPDATE: AvailableIntentsEventsEnum.GUILD_MEMBERS,
    GUILD_MEMBER_REMOVE: AvailableIntentsEventsEnum.GUILD_MEMBERS,
    //  ======= AUDIO_ACTION ======
    AUDIO_START: AvailableIntentsEventsEnum.AUDIO_ACTION,
    AUDIO_FINISH: AvailableIntentsEventsEnum.AUDIO_ACTION,
    AUDIO_ON_MIC: AvailableIntentsEventsEnum.AUDIO_ACTION,
    AUDIO_OFF_MIC: AvailableIntentsEventsEnum.AUDIO_ACTION,
    //  ======= GUILD_MESSAGE_REACTIONS ======
    MESSAGE_REACTION_ADD: AvailableIntentsEventsEnum.GUILD_MESSAGE_REACTIONS,
    MESSAGE_REACTION_REMOVE: AvailableIntentsEventsEnum.GUILD_MESSAGE_REACTIONS,
    //  ======= MESSAGE_AUDIT ======
    MESSAGE_AUDIT_PASS: AvailableIntentsEventsEnum.MESSAGE_AUDIT,
    MESSAGE_AUDIT_REJECT: AvailableIntentsEventsEnum.MESSAGE_AUDIT,
    //  ======= FORUM_EVENT ======
    THREAD_CREATE: AvailableIntentsEventsEnum.FORUM_EVENT,
    THREAD_UPDATE: AvailableIntentsEventsEnum.FORUM_EVENT,
    POST_CREATE: AvailableIntentsEventsEnum.FORUM_EVENT,
    POST_DELETE: AvailableIntentsEventsEnum.FORUM_EVENT,
    REPLY_CREATE: AvailableIntentsEventsEnum.FORUM_EVENT,
    REPLY_DELETE: AvailableIntentsEventsEnum.FORUM_EVENT,
    //  ======= DIRECT_MESSAGE ======
    DIRECT_MESSAGE_CREATE: AvailableIntentsEventsEnum.DIRECT_MESSAGE,
    //  ======= AT_MESSAGES ======
    AT_MESSAGE_CREATE: AvailableIntentsEventsEnum.AT_MESSAGES,
    //  ======= GUILD_MESSAGES ======
    MESSAGE_CREATE: AvailableIntentsEventsEnum.GUILD_MESSAGES, // 机器人收到频道消息时触发
};
exports.WSCodes = {
    1000: 'WS_CLOSE_REQUESTED',
    4004: 'TOKEN_INVALID',
    4010: 'SHARDING_INVALID',
    4011: 'SHARDING_REQUIRED',
    4013: 'INVALID_INTENTS',
    4014: 'DISALLOWED_INTENTS',
};
// websocket错误原因
exports.WebsocketCloseReason = [
    {
        code: 4001,
        reason: '无效的opcode',
    },
    {
        code: 4002,
        reason: '无效的payload',
    },
    {
        code: 4007,
        reason: 'seq错误',
    },
    {
        code: 4008,
        reason: '发送 payload 过快，请重新连接，并遵守连接后返回的频控信息',
        resume: true,
    },
    {
        code: 4009,
        reason: '连接过期，请重连',
        resume: true,
    },
    {
        code: 4010,
        reason: '无效的shard',
    },
    {
        code: 4011,
        reason: '连接需要处理的guild过多，请进行合理分片',
    },
    {
        code: 4012,
        reason: '无效的version',
    },
    {
        code: 4013,
        reason: '无效的intent',
    },
    {
        code: 4014,
        reason: 'intent无权限',
    },
    {
        code: 4900,
        reason: '内部错误，请重连',
    },
    {
        code: 4914,
        reason: '机器人已下架,只允许连接沙箱环境,请断开连接,检验当前连接环境',
    },
    {
        code: 4915,
        reason: '机器人已封禁,不允许连接,请断开连接,申请解封后再连接',
    },
];
// 用户输入的intents类型
exports.IntentEvents = {
    GUILDS: 1 << 0,
    GUILD_MEMBERS: 1 << 1,
    GUILD_MESSAGES: 1 << 9,
    GUILD_MESSAGE_REACTIONS: 1 << 10,
    DIRECT_MESSAGE: 1 << 12,
    MESSAGE_AUDIT: 1 << 27,
    FORUM_EVENT: 1 << 28,
    AUDIO_ACTION: 1 << 29,
    AT_MESSAGES: 1 << 30,
};
// intents
exports.Intents = {
    GUILDS: 0,
    GUILD_MEMBERS: 1,
    GUILD_BANS: 2,
    GUILD_EMOJIS: 3,
    GUILD_INTEGRATIONS: 4,
    GUILD_WEBHOOKS: 5,
    GUILD_INVITES: 6,
    GUILD_VOICE_STATES: 7,
    GUILD_PRESENCES: 8,
    GUILD_MESSAGES: 9,
    GUILD_MESSAGE_REACTIONS: 10,
    GUILD_MESSAGE_TYPING: 11,
    DIRECT_MESSAGES: 12,
    DIRECT_MESSAGE_REACTIONS: 13,
    DIRECT_MESSAGE_TYPING: 14,
};
// Session事件
exports.SessionEvents = {
    CLOSED: 'CLOSED',
    READY: 'READY',
    ERROR: 'ERROR',
    INVALID_SESSION: 'INVALID_SESSION',
    RECONNECT: 'RECONNECT',
    DISCONNECT: 'DISCONNECT',
    EVENT_WS: 'EVENT_WS',
    RESUMED: 'RESUMED',
    DEAD: 'DEAD', // 连接已死亡，请检查网络或重启
};
// ws地址配置
const WsObjRequestOptions = (sandbox) => ({
    method: 'GET',
    url: (0, utils_1.buildUrl)((0, resource_1.getURL)('wsInfo'), sandbox),
    headers: {
        Accept: '*/*',
        'Accept-Encoding': 'utf-8',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        Connection: 'keep-alive',
        'User-Agent': openapi_1.apiVersion,
        Authorization: '',
    },
});
exports.WsObjRequestOptions = WsObjRequestOptions;
