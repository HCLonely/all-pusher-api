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
exports.TelegramBot = void 0;
/* global sendOptions,TelegramBotOptions, result, TelegramBotConfig */
const axios_1 = require("axios");
const tool_1 = require("./tool");
class TelegramBot {
    constructor({ token, chat_id, key, proxy }) {
        this.baseURL = 'https://api.telegram.org/bot';
        if (!token && !(key === null || key === void 0 ? void 0 : key.token)) {
            throw new Error('Missing Parameter: token');
        }
        if (!chat_id && !(key === null || key === void 0 ? void 0 : key.chat_id)) {
            throw new Error('Missing Parameter: chat_id');
        }
        // @ts-ignore
        this._KEY = token || key.token;
        // @ts-ignore
        this._CHAT_ID = chat_id || key.chat_id;
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
            let telegramBotOptions;
            if (sendOptions.customOptions) {
                telegramBotOptions = sendOptions.customOptions;
            }
            else {
                telegramBotOptions = {
                    text: sendOptions.message
                };
                if (sendOptions.type === 'html') {
                    telegramBotOptions.parse_mode = 'HTML';
                }
                if (sendOptions.type === 'markdown') {
                    telegramBotOptions.parse_mode = 'Markdown';
                }
            }
            if (!telegramBotOptions.chat_id) {
                telegramBotOptions.chat_id = this._CHAT_ID;
            }
            if (sendOptions.extraOptions) {
                telegramBotOptions = Object.assign(Object.assign({}, telegramBotOptions), sendOptions.extraOptions);
            }
            const axiosOptions = {
                url: `${this.baseURL}${this._KEY}/sendMessage`,
                method: 'POST',
                data: (0, tool_1.queryStringify)(telegramBotOptions)
            };
            if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
            }
            return (0, axios_1.default)(axiosOptions).then((response) => {
                if (response.data) {
                    if (response.data.ok) {
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
        return this.send({ message: '测试内容' });
    }
}
exports.TelegramBot = TelegramBot;
