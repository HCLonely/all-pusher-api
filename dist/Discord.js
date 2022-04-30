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
exports.Discord = void 0;
/* global sendOptions, DiscordOptions, result, DiscordConfig */
const axios_1 = __importDefault(require("axios"));
const tool_1 = require("./tool");
class Discord {
    constructor({ webhook, key, proxy }) {
        if (!webhook && !(key === null || key === void 0 ? void 0 : key.webhook)) {
            throw new Error('Missing Parameter: webhook');
        }
        // @ts-ignore
        this._WEBHOOK = webhook || key.webhook;
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
            let discordOptions;
            if (sendOptions.customOptions) {
                discordOptions = sendOptions.customOptions;
            }
            else {
                discordOptions = {
                    content: sendOptions.title ? `${sendOptions.title}\n${sendOptions.message}` : sendOptions.message
                };
            }
            if (sendOptions.extraOptions) {
                discordOptions = Object.assign(Object.assign({}, discordOptions), sendOptions.extraOptions);
            }
            const axiosOptions = {
                url: this._WEBHOOK,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                data: discordOptions
            };
            if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
            }
            return (0, axios_1.default)(axiosOptions).then((response) => ({
                status: 200,
                statusText: 'Success',
                extraMessage: response
            })).catch((error) => ({
                status: 102,
                statusText: 'Request Error',
                extraMessage: error
            }));
        });
    }
}
exports.Discord = Discord;
