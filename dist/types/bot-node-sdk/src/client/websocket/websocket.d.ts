/// <reference types="node" />
import { AvailableIntentsEventsEnum, GetWsParam, OpCode, SessionRecord, WsAddressObj, wsResData } from '../../types/websocket-types';
import WebSocket, { EventEmitter } from 'ws';
export declare class Ws {
    ws: WebSocket;
    event: EventEmitter;
    config: GetWsParam;
    heartbeatInterval: number;
    heartbeatParam: {
        op: OpCode;
        d: null;
    };
    isReconnect: boolean;
    sessionRecord: {
        sessionID: string;
        seq: number;
    };
    alive: boolean;
    heartbeatTimeout: NodeJS.Timeout;
    constructor(config: GetWsParam, event: EventEmitter, sessionRecord?: SessionRecord);
    createWebsocket(wsData: WsAddressObj): WebSocket;
    createListening(): WebSocket;
    connectWs(wsData: WsAddressObj): void;
    authWs(): void;
    getValidIntents(): number | undefined;
    getValidIntentsType(): AvailableIntentsEventsEnum[];
    checkShards(shardsArr: Array<number> | undefined): number[] | undefined;
    sendWs(msg: unknown): void;
    reconnect(): void;
    reconnectWs(): void;
    dispatchEvent(eventType: string, wsRes: wsResData): void;
    closeWs(): void;
    handleWsCloseEvent(code: number): void;
}
