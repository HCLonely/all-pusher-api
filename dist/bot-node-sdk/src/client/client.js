"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_types_1 = require("../types/websocket-types");
const session_1 = __importDefault(require("./session/session"));
const ws_1 = require("ws");
const MAX_RETRY = 10;
class WebsocketClient extends ws_1.EventEmitter {
    constructor(config) {
        super();
        this.retry = 0;
        this.connect(config);
        this.on(websocket_types_1.SessionEvents.EVENT_WS, (data) => {
            var _a;
            switch (data.eventType) {
                case websocket_types_1.SessionEvents.RECONNECT:
                    // console.log('[CLIENT] 等待断线重连中...');
                    break;
                case websocket_types_1.SessionEvents.DISCONNECT:
                    if (this.retry < (config.maxRetry || MAX_RETRY)) {
                        // console.log('[CLIENT] 重新连接中，尝试次数：', this.retry + 1);
                        this.connect(config, ((_a = websocket_types_1.WebsocketCloseReason.find((v) => v.code === data.code)) === null || _a === void 0 ? void 0 : _a.resume) ? data.eventMsg : null);
                        this.retry += 1;
                    }
                    else {
                        // console.log('[CLIENT] 超过重试次数，连接终止');
                        this.emit(websocket_types_1.SessionEvents.DEAD, { eventType: websocket_types_1.SessionEvents.ERROR, msg: '连接已死亡，请检查网络或重启' });
                    }
                    break;
                case websocket_types_1.SessionEvents.READY:
                    // console.log('[CLIENT] 连接成功');
                    this.retry = 0;
                    break;
                default:
            }
        });
    }
    // 连接
    connect(config, sessionRecord) {
        const event = this;
        // 新建一个会话
        this.session = new session_1.default(config, event, sessionRecord);
        return this.session;
    }
    // 断开连接
    disconnect() {
        this.retry = 0;
        this.session.ws.ws.removeAllListeners();
        this.session.ws.event.removeAllListeners();
        this.removeAllListeners();
        this.connect = () => { };
        // 关闭会话
        this.session.closeSession();
    }
}
exports.default = WebsocketClient;
