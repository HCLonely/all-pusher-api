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
exports.PushPlus = void 0;
/* global sendOptions, PushPlusOptions, result, PushPlusConfig */
const axios_1 = require("axios");
const tool_1 = require("./tool");
const showdown_1 = require("showdown");
class PushPlus {
    constructor({ token, key, proxy }) {
        this.baseURL = 'https://pushplus.hxtrip.com/send/';
        if (!token && !(key === null || key === void 0 ? void 0 : key.token)) {
            throw new Error('Missing Parameter: token');
        }
        // @ts-ignore
        this._KEY = token || key.token;
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
            let pushPlusOptions;
            if (sendOptions.customOptions) {
                pushPlusOptions = sendOptions.customOptions;
            }
            else {
                pushPlusOptions = {
                    content: sendOptions.message
                };
                if (sendOptions.title) {
                    pushPlusOptions.title = sendOptions.title;
                }
                if (['html', 'markdown'].includes(sendOptions.type || '')) {
                    pushPlusOptions.template = 'html';
                }
                if (sendOptions.type === 'markdown') {
                    // @ts-ignore
                    pushPlusOptions.content = new showdown_1.default().Converter().makeHtml(sendOptions.message);
                }
            }
            if (sendOptions.extraOptions) {
                pushPlusOptions = Object.assign(Object.assign({}, pushPlusOptions), sendOptions.extraOptions);
            }
            const axiosOptions = {
                url: `${this.baseURL}${this._KEY}`,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                data: pushPlusOptions
            };
            if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
            }
            return (0, axios_1.default)(axiosOptions).then((response) => {
                if (response.data) {
                    if (response.data.code === 200) {
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
exports.PushPlus = PushPlus;
