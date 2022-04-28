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
exports.WxPusher = void 0;
/* global sendOptions, WxPusherOptions, result, WxPusherConfig */
const axios_1 = require("axios");
const tool_1 = require("./tool");
const showdown_1 = require("showdown");
class WxPusher {
    constructor({ token, uids, topicIds, key, proxy }) {
        this.baseURL = 'https://wxpusher.zjiecode.com/api/send/message';
        if (!token && !(key === null || key === void 0 ? void 0 : key.token)) {
            throw new Error('Missing Parameter: token');
        }
        // @ts-ignore
        this._KEY = token || key.token;
        if (proxy) {
            this.httpsAgent = (0, tool_1.proxy2httpsAgent)(proxy);
        }
        if (uids || (key === null || key === void 0 ? void 0 : key.uids)) {
            // @ts-ignore
            this.uids = uids || key.uids;
        }
        if (topicIds || (key === null || key === void 0 ? void 0 : key.topicIds)) {
            // @ts-ignore
            this.topicIds = topicIds || key.topicIds;
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
            let wxPusherOptions;
            if (sendOptions.customOptions) {
                wxPusherOptions = sendOptions.customOptions;
                wxPusherOptions.appToken = this._KEY;
            }
            else {
                wxPusherOptions = {
                    content: sendOptions.message,
                    appToken: this._KEY,
                    contentType: ['html', 'markdown'].includes(sendOptions.type || '') ? 2 : 1
                };
                if (sendOptions.title) {
                    wxPusherOptions.summary = sendOptions.title;
                }
                if (sendOptions.type === 'markdown') {
                    // @ts-ignore
                    wxPusherOptions.content = new showdown_1.default().Converter().makeHtml(sendOptions.message);
                }
            }
            if (!wxPusherOptions.uids && this.uids) {
                wxPusherOptions.uids = this.uids;
            }
            if (!wxPusherOptions.topicIds && this.topicIds) {
                wxPusherOptions.topicIds = this.topicIds;
            }
            if (sendOptions.extraOptions) {
                wxPusherOptions = Object.assign(Object.assign({}, wxPusherOptions), sendOptions.extraOptions);
            }
            const axiosOptions = {
                url: this.baseURL,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                data: wxPusherOptions
            };
            if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
            }
            return (0, axios_1.default)(axiosOptions).then((response) => {
                if (response.data) {
                    if (response.data.success === true) {
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
exports.WxPusher = WxPusher;
