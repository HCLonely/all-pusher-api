"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_types_1 = require("../../types/websocket-types");
const websocket_1 = require("../../client/websocket/websocket");
const resty_client_1 = __importDefault(require("resty-client"));
const utils_1 = require("../../utils/utils");
class Session {
    constructor(config, event, sessionRecord) {
        this.config = config;
        this.event = event;
        // 如果会话记录存在的话，继续透传
        if (sessionRecord) {
            this.sessionRecord = sessionRecord;
        }
        this.createSession();
    }
    // 新建会话
    createSession() {
        this.ws = new websocket_1.Ws(this.config, this.event, this.sessionRecord || undefined);
        // 拿到 ws地址等信息
        const reqOptions = (0, websocket_types_1.WsObjRequestOptions)(this.config.sandbox);
        (0, utils_1.addAuthorization)(reqOptions.headers, this.config.appID, this.config.token);
        resty_client_1.default
            .create(reqOptions)
            .get(reqOptions.url, {})
            .then((r) => {
            const wsData = r.data;
            if (!wsData)
                throw new Error('获取ws连接信息异常');
            this.ws.createWebsocket(wsData);
        })
            .catch((e) => {
            console.log('[ERROR] createSession: ', e);
            this.event.emit(websocket_types_1.SessionEvents.EVENT_WS, {
                eventType: websocket_types_1.SessionEvents.DISCONNECT,
                eventMsg: this.sessionRecord,
            });
        });
    }
    // 关闭会话
    closeSession() {
        this.ws.closeWs();
    }
}
exports.default = Session;
