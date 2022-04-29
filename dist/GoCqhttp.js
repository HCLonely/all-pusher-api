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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoCqhttp = void 0;
/* global sendOptions, GoCqhttpOptions, result, GoCqhttpConfig */
const axios_1 = require("axios");
const tool_1 = require("./tool");
class GoCqhttp {
    constructor({ baseUrl, token, user_id, group_id, key, proxy }) {
        if (!baseUrl && !(key === null || key === void 0 ? void 0 : key.baseUrl)) {
            throw new Error('Missing Parameter: baseUrl');
        }
        // @ts-ignore
        this._BASE_URL = baseUrl || key.baseUrl;
        if (token || (key === null || key === void 0 ? void 0 : key.token)) {
            // @ts-ignore
            this._KEY = token || key.token;
        }
        if (user_id || (key === null || key === void 0 ? void 0 : key.user_id)) {
            // @ts-ignore
            this.user_id = user_id || key.user_id;
        }
        if (group_id || (key === null || key === void 0 ? void 0 : key.group_id)) {
            // @ts-ignore
            this.group_id = group_id || key.group_id;
        }
        if (proxy) {
            this.httpsAgent = (0, tool_1.proxy2httpsAgent)(proxy, new URL(this._BASE_URL).protocol.replace(':', ''));
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
            let goCqhttpOptions;
            if (sendOptions.customOptions) {
                goCqhttpOptions = sendOptions.customOptions;
            }
            else {
                goCqhttpOptions = {
                    message: sendOptions.message
                };
                if (this.user_id) {
                    goCqhttpOptions.user_id = this.user_id;
                }
                if (this.group_id) {
                    goCqhttpOptions.group_id = this.group_id;
                }
            }
            if (sendOptions.extraOptions) {
                goCqhttpOptions = Object.assign(Object.assign({}, goCqhttpOptions), sendOptions.extraOptions);
            }
            const axiosOptions = {
                url: `${this._BASE_URL}/send_msg`,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${this._KEY}`
                },
                data: goCqhttpOptions
            };
            if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
            }
            return (0, axios_1.default)(axiosOptions).then((response) => {
                if (response.data) {
                    if (response.data.retcode === 0) {
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
    test() {
        return this.send({ title: '测试标题', message: '测试内容', type: 'text' });
    }
}
exports.GoCqhttp = GoCqhttp;
