/// <reference types="node" />
import { GetWsParam, SessionRecord } from '../types/websocket-types';
import Session from './session/session';
import { EventEmitter } from 'ws';
export default class WebsocketClient extends EventEmitter {
    session: Session;
    retry: number;
    constructor(config: GetWsParam);
    connect(config: GetWsParam, sessionRecord?: SessionRecord): any;
    disconnect(): void;
}
