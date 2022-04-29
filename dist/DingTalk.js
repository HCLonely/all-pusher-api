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
var _DingTalk_instances, _DingTalk_sign;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DingTalk = void 0;
/* global sendOptions, DingTalkOptions, result, DingTalkConfig */
const axios_1 = require("axios");
const crypto_1 = require("crypto");
const tool_1 = require("./tool");
class DingTalk {
    constructor({ token, key, proxy }) {
        _DingTalk_instances.add(this);
        this.baseURL = 'https://oapi.dingtalk.com/robot/send';
        if (!token && !(key === null || key === void 0 ? void 0 : key.token)) {
            throw new Error('Missing Parameter: token');
        }
        // @ts-ignore
        this._KEY = token || key.token;
        if (key === null || key === void 0 ? void 0 : key.secret) {
            this._SECRET = key.secret;
        }
        if (proxy) {
            this.httpsAgent = (0, tool_1.proxy2httpsAgent)(proxy);
        }
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
            let dingTalkOptions;
            if (sendOptions.customOptions) {
                dingTalkOptions = sendOptions.customOptions;
            }
            else {
                if (!sendOptions.type || sendOptions.type === 'text') {
                    dingTalkOptions = {
                        msgtype: 'text',
                        text: {
                            content: sendOptions.message
                        }
                    };
                }
                else if (sendOptions.type === 'markdown') {
                    dingTalkOptions = {
                        msgtype: 'markdown',
                        markdown: {
                            text: sendOptions.message,
                            title: sendOptions.title || sendOptions.message.split('\n')[0].trim()
                        }
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
            if (sendOptions.extraOptions) {
                dingTalkOptions = Object.assign(Object.assign({}, dingTalkOptions), sendOptions.extraOptions);
            }
            const axiosOptions = {
                url: `${this.baseURL}?access_token=${this._KEY}${this._SECRET ? `&${(0, tool_1.queryStringify)(__classPrivateFieldGet(this, _DingTalk_instances, "m", _DingTalk_sign).call(this))}` : ''}`,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                data: dingTalkOptions
            };
            if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
            }
            return (0, axios_1.default)(axiosOptions).then((response) => {
                if (response.data) {
                    console.log(response.data.errcode);
                    if (!response.data.errcode) {
                        return {
                            status: 200,
                            statusText: 'Success',
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
            }).catch((error) => ({
                status: 102,
                statusText: 'Request Error',
                extraMessage: error
            }));
        });
    }
}
exports.DingTalk = DingTalk;
_DingTalk_instances = new WeakSet(), _DingTalk_sign = function _DingTalk_sign() {
    const timestamp = new Date().getTime();
    const stringToSign = `${timestamp}\n${this._SECRET}`;
    const hash = (0, crypto_1.createHmac)('sha256', this._SECRET)
        .update(stringToSign, 'utf8')
        .digest();
    return {
        timestamp,
        sign: encodeURIComponent(hash.toString('base64'))
    };
};
