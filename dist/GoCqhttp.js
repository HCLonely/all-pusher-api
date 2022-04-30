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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoCqhttp = void 0;
/* global sendOptions, GoCqhttpOptions, result, GoCqhttpConfig */
const axios_1 = __importDefault(require("axios"));
const tool_1 = require("./tool");
class GoCqhttp {
    constructor({ baseUrl, token, user_id, group_id, guild_id, channel_id, key, proxy }) {
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
        if (guild_id || (key === null || key === void 0 ? void 0 : key.guild_id)) {
            // @ts-ignore
            this.group_id = guild_id || key.guild_id;
        }
        if (channel_id || (key === null || key === void 0 ? void 0 : key.channel_id)) {
            // @ts-ignore
            this.channel_id = channel_id || key.channel_id;
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
                if (this.guild_id) {
                    goCqhttpOptions.guild_id = this.guild_id;
                }
                if (this.channel_id) {
                    goCqhttpOptions.channel_id = this.channel_id;
                }
            }
            if (sendOptions.extraOptions) {
                goCqhttpOptions = Object.assign(Object.assign({}, goCqhttpOptions), sendOptions.extraOptions);
            }
            if ((goCqhttpOptions.guild_id && !goCqhttpOptions.channel_id) ||
                (goCqhttpOptions.channel_id && !goCqhttpOptions.guild_id)) {
                return {
                    status: 103,
                    statusText: 'Options Format Error: Both "channel_id" & "guild_id" must exist',
                    extraMessage: goCqhttpOptions
                };
            }
            if ([goCqhttpOptions.user_id, goCqhttpOptions.group_id, goCqhttpOptions.channel_id].filter((e) => e).length > 1) {
                return {
                    status: 103,
                    statusText: 'Options Format Error: "user_id", "group_id", and "channel_id" cannot exist at the same time',
                    extraMessage: goCqhttpOptions
                };
            }
            const axiosOptions = {
                url: `${this._BASE_URL}${goCqhttpOptions.channel_id ? '/send_guild_channel_msg' : '/send_msg'}`,
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
}
exports.GoCqhttp = GoCqhttp;
