import { SessionEvents, WsObjRequestOptions } from '../../types/websocket-types';
import { Ws } from '../../client/websocket/websocket';
import resty from 'resty-client';
import { addAuthorization } from '../../utils/utils';
export default class Session {
    config;
    heartbeatInterval;
    ws;
    event;
    sessionRecord;
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
        this.ws = new Ws(this.config, this.event, this.sessionRecord || undefined);
        // 拿到 ws地址等信息
        const reqOptions = WsObjRequestOptions(this.config.sandbox);
        // @ts-ignore
        addAuthorization(reqOptions.headers, this.config.appID, this.config.token);
        resty
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
            this.event.emit(SessionEvents.EVENT_WS, {
                eventType: SessionEvents.DISCONNECT,
                eventMsg: this.sessionRecord,
            });
        });
    }
    // 关闭会话
    closeSession() {
        this.ws.closeWs();
    }
}
