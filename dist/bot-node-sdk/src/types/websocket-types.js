import { apiVersion } from '../openapi/v1/openapi';
import { getURL } from '../openapi/v1/resource';
import { buildUrl } from '../utils/utils';
// 心跳参数
export var OpCode;
(function (OpCode) {
    OpCode[OpCode["DISPATCH"] = 0] = "DISPATCH";
    OpCode[OpCode["HEARTBEAT"] = 1] = "HEARTBEAT";
    OpCode[OpCode["IDENTIFY"] = 2] = "IDENTIFY";
    OpCode[OpCode["RESUME"] = 6] = "RESUME";
    OpCode[OpCode["RECONNECT"] = 7] = "RECONNECT";
    OpCode[OpCode["INVALID_SESSION"] = 9] = "INVALID_SESSION";
    OpCode[OpCode["HELLO"] = 10] = "HELLO";
    OpCode[OpCode["HEARTBEAT_ACK"] = 11] = "HEARTBEAT_ACK";
})(OpCode || (OpCode = {}));
// 可使用的intents事件类型
export var AvailableIntentsEventsEnum;
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
})(AvailableIntentsEventsEnum || (AvailableIntentsEventsEnum = {}));
// OpenAPI传过来的事件类型
export const WsEventType = {
    //  ======= GUILDS ======
    GUILD_CREATE: AvailableIntentsEventsEnum.GUILDS, // 频道创建
    GUILD_UPDATE: AvailableIntentsEventsEnum.GUILDS, // 频道更新
    GUILD_DELETE: AvailableIntentsEventsEnum.GUILDS, // 频道删除
    CHANNEL_CREATE: AvailableIntentsEventsEnum.GUILDS, // 子频道创建
    CHANNEL_UPDATE: AvailableIntentsEventsEnum.GUILDS, // 子频道更新
    CHANNEL_DELETE: AvailableIntentsEventsEnum.GUILDS, // 子频道删除
    //  ======= GUILD_MEMBERS ======
    GUILD_MEMBER_ADD: AvailableIntentsEventsEnum.GUILD_MEMBERS, // 频道成员加入
    GUILD_MEMBER_UPDATE: AvailableIntentsEventsEnum.GUILD_MEMBERS, // 频道成员更新
    GUILD_MEMBER_REMOVE: AvailableIntentsEventsEnum.GUILD_MEMBERS, // 频道成员移除
    //  ======= AUDIO_ACTION ======
    AUDIO_START: AvailableIntentsEventsEnum.AUDIO_ACTION, // 音频开始播放
    AUDIO_FINISH: AvailableIntentsEventsEnum.AUDIO_ACTION, // 音频结束播放
    AUDIO_ON_MIC: AvailableIntentsEventsEnum.AUDIO_ACTION, // 机器人上麦
    AUDIO_OFF_MIC: AvailableIntentsEventsEnum.AUDIO_ACTION, // 机器人下麦
    //  ======= GUILD_MESSAGE_REACTIONS ======
    MESSAGE_REACTION_ADD: AvailableIntentsEventsEnum.GUILD_MESSAGE_REACTIONS, // 为消息添加表情表态
    MESSAGE_REACTION_REMOVE: AvailableIntentsEventsEnum.GUILD_MESSAGE_REACTIONS, // 为消息删除表情表态
    //  ======= MESSAGE_AUDIT ======
    MESSAGE_AUDIT_PASS: AvailableIntentsEventsEnum.MESSAGE_AUDIT, // / 消息审核通过
    MESSAGE_AUDIT_REJECT: AvailableIntentsEventsEnum.MESSAGE_AUDIT, // / 消息审核不通过
    //  ======= FORUM_EVENT ======
    THREAD_CREATE: AvailableIntentsEventsEnum.FORUM_EVENT, // / 当用户创建主题时
    THREAD_UPDATE: AvailableIntentsEventsEnum.FORUM_EVENT, // 当用户删除主题时
    POST_CREATE: AvailableIntentsEventsEnum.FORUM_EVENT, // 当用户创建帖子时
    POST_DELETE: AvailableIntentsEventsEnum.FORUM_EVENT, // 当用户删除帖子时
    REPLY_CREATE: AvailableIntentsEventsEnum.FORUM_EVENT, // 当用户回复评论时
    REPLY_DELETE: AvailableIntentsEventsEnum.FORUM_EVENT, // 当用户回复评论时
    //  ======= DIRECT_MESSAGE ======
    DIRECT_MESSAGE_CREATE: AvailableIntentsEventsEnum.DIRECT_MESSAGE, // 当收到用户发给机器人的私信消息时
    //  ======= AT_MESSAGES ======
    AT_MESSAGE_CREATE: AvailableIntentsEventsEnum.AT_MESSAGES, // 机器人被@时触发
    //  ======= GUILD_MESSAGES ======
    MESSAGE_CREATE: AvailableIntentsEventsEnum.GUILD_MESSAGES, // 机器人收到频道消息时触发
};
export const WSCodes = {
    1000: 'WS_CLOSE_REQUESTED',
    4004: 'TOKEN_INVALID',
    4010: 'SHARDING_INVALID',
    4011: 'SHARDING_REQUIRED',
    4013: 'INVALID_INTENTS',
    4014: 'DISALLOWED_INTENTS',
};
// websocket错误原因
export const WebsocketCloseReason = [
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
export const IntentEvents = {
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
export const Intents = {
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
export const SessionEvents = {
    CLOSED: 'CLOSED',
    READY: 'READY', // 已经可以通信
    ERROR: 'ERROR', // 会话错误
    INVALID_SESSION: 'INVALID_SESSION',
    RECONNECT: 'RECONNECT', // 服务端通知重新连接
    DISCONNECT: 'DISCONNECT', // 断线
    EVENT_WS: 'EVENT_WS', // 内部通信
    RESUMED: 'RESUMED', // 重连
    DEAD: 'DEAD', // 连接已死亡，请检查网络或重启
};
// ws地址配置
export const WsObjRequestOptions = (sandbox) => ({
    method: 'GET',
    url: buildUrl(getURL('wsInfo'), sandbox),
    headers: {
        Accept: '*/*',
        'Accept-Encoding': 'utf-8',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        Connection: 'keep-alive',
        'User-Agent': apiVersion,
        Authorization: '',
    },
});
