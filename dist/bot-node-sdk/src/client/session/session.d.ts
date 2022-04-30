/// <reference types="node" />
import { GetWsParam, SessionRecord } from '../../types/websocket-types';
import { Ws } from '../../client/websocket/websocket';
import { EventEmitter } from 'ws';
export default class Session {
    config: GetWsParam;
    heartbeatInterval: number;
    ws: Ws;
    event: EventEmitter;
    sessionRecord: SessionRecord | undefined;
    constructor(config: GetWsParam, event: EventEmitter, sessionRecord?: SessionRecord);
    createSession(): void;
    closeSession(): void;
}
