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
exports.ServerChanTurbo = void 0;
/* global sendOptions, ServerChanTurboOptions, result, ServerChanTurboConfig */
const axios_1 = require("axios");
const tool_1 = require("./tool");
class ServerChanTurbo {
    constructor({ token, key, proxy }) {
        this.baseURL = 'https://sctapi.ftqq.com/';
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
            let serverChanTurboOptions;
            if (sendOptions.customOptions) {
                serverChanTurboOptions = sendOptions.customOptions;
            }
            else {
                serverChanTurboOptions = {
                    title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
                    desp: sendOptions.message
                };
            }
            if (sendOptions.extraOptions) {
                serverChanTurboOptions = Object.assign(Object.assign({}, serverChanTurboOptions), sendOptions.extraOptions);
            }
            const axiosOptions = {
                url: `${this.baseURL}${this._KEY}.send`,
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                data: (0, tool_1.queryStringify)(serverChanTurboOptions)
            };
            if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
            }
            return (0, axios_1.default)(axiosOptions).then((response) => {
                var _a;
                if (response.data) {
                    if (((_a = response.data.data) === null || _a === void 0 ? void 0 : _a.error) === 'SUCCESS') {
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
exports.ServerChanTurbo = ServerChanTurbo;
