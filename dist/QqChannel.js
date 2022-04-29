"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _QqChannel_instances, _QqChannel_sign;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QqChannel = void 0;
/* global sendOptions, result, QqChannelConfig */
const qq_guild_bot_1 = require("qq-guild-bot");
class QqChannel {
    constructor({ key, channelID }) {
        _QqChannel_instances.add(this);
        if (!key) {
            throw new Error('Missing Parameter: key');
        }
        if (!channelID) {
            throw new Error('Missing Parameter: channelID');
        }
        this._CONFIG = key;
        this.channelID = channelID;
    }
    send(sendOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!sendOptions.message && !sendOptions.customOptions) {
                return {
                    status: 0,
                    statusText: 'Missing Parameter: message',
                    extraMessage: null
                };
            }
            let qqChannelOptions;
            if (sendOptions.customOptions) {
                qqChannelOptions = sendOptions.customOptions;
            }
            else {
                if (!sendOptions.type || sendOptions.type === 'text') {
                    qqChannelOptions = {
                        content: sendOptions.message
                    };
                }
                else {
                    return {
                        status: 103,
                        statusText: 'Options Format Error',
                        extraMessage: sendOptions
                    };
                }
            }
            if (!this.channelID) {
                return {
                    status: 0,
                    statusText: 'Missing Parameter: channelID',
                    extraMessage: null
                };
            }
            if (sendOptions.extraOptions) {
                qqChannelOptions = Object.assign(Object.assign({}, qqChannelOptions), sendOptions.extraOptions);
            }
            const client = (0, qq_guild_bot_1.createOpenAPI)(this._CONFIG);
            const ws = yield __classPrivateFieldGet(this, _QqChannel_instances, "m", _QqChannel_sign).call(this).then((ws) => ws).catch((error) => ({
                status: 140,
                statusText: 'Check Sign Failed',
                extraMessage: error
            }));
            if (ws.status === 140) {
                return ws;
            }
            // console.log(ws.session.ws.ws.close());
            return client.messageApi.postMessage(this.channelID, qqChannelOptions).then((response) => {
                ws.retry = 0;
                ws.session.ws.ws.removeAllListeners();
                ws.session.ws.event.removeAllListeners();
                ws.removeAllListeners();
                ws.connect = () => { };
                ws.disconnect();
                if (response.data) {
                    // @ts-ignore
                    if (!response.data.code) {
                        return {
                            status: 200,
                            statusText: 'Success',
                            extraMessage: response
                        };
                    }
                    // @ts-ignore
                    if (response.data.code === 304023) {
                        return {
                            status: 201,
                            statusText: 'Waiting',
                            extraMessage: response
                        };
                    }
                    return {
                        status: 100,
                        statusText: 'Error',
                        extraMessage: response
                    };
                }
                return {
                    status: 101,
                    statusText: 'No Response Data',
                    extraMessage: response
                };
            }).catch((error) => {
                ws.retry = 0;
                ws.session.ws.ws.removeAllListeners();
                ws.session.ws.event.removeAllListeners();
                ws.removeAllListeners();
                ws.connect = () => { };
                ws.disconnect();
                return {
                    status: 102,
                    statusText: 'Request Error',
                    extraMessage: error
                };
            });
        });
    }
}
exports.QqChannel = QqChannel;
_QqChannel_instances = new WeakSet(), _QqChannel_sign = function _QqChannel_sign() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const ws = (0, qq_guild_bot_1.createWebsocket)(Object.assign(Object.assign({}, this._CONFIG), { maxRetry: 3 }));
            ws.on('READY', () => {
                resolve(ws);
            });
            ws.on('ERROR', (data) => {
                reject(data);
            });
        });
    });
};
