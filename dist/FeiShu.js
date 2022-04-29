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
var _FeiShu_instances, _FeiShu_sign;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeiShu = void 0;
/* global sendOptions, FeiShuOptions, result FeiShuConfig */
const axios_1 = require("axios");
const crypto_1 = require("crypto");
const tool_1 = require("./tool");
class FeiShu {
    constructor({ token, key, proxy }) {
        _FeiShu_instances.add(this);
        this.baseURL = 'https://open.feishu.cn/open-apis/bot/v2/hook/';
        if (!token && !(key === null || key === void 0 ? void 0 : key.token)) {
            throw new Error('Missing Parameter: key.token');
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
            let feiShuOptions;
            if (sendOptions.customOptions) {
                feiShuOptions = sendOptions.customOptions;
            }
            else {
                if (!sendOptions.type || sendOptions.type === 'text') {
                    feiShuOptions = {
                        msg_type: 'text',
                        content: {
                            text: sendOptions.message
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
            if (this._SECRET) {
                feiShuOptions = Object.assign(Object.assign({}, __classPrivateFieldGet(this, _FeiShu_instances, "m", _FeiShu_sign).call(this)), feiShuOptions);
            }
            if (sendOptions.extraOptions) {
                feiShuOptions = Object.assign(Object.assign({}, feiShuOptions), sendOptions.extraOptions);
            }
            const axiosOptions = {
                url: `${this.baseURL}${this._KEY}`,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                data: feiShuOptions
            };
            if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
            }
            return (0, axios_1.default)(axiosOptions).then((response) => {
                if (response.data) {
                    if (!response.data.code) {
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
exports.FeiShu = FeiShu;
_FeiShu_instances = new WeakSet(), _FeiShu_sign = function _FeiShu_sign() {
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const stringToSign = `${timestamp}\n${this._SECRET}`;
    const hash = (0, crypto_1.createHmac)('sha256', stringToSign)
        .digest();
    return {
        timestamp,
        sign: hash.toString('base64')
    };
};
