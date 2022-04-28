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
var _WorkWeixin_instances, _WorkWeixin_getToken;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkWeixin = void 0;
/* global sendOptions, WorkWeixinOptions, result, WorkWeixinConfig */
const axios_1 = require("axios");
const tool_1 = require("./tool");
class WorkWeixin {
    constructor({ corpid, secret, agentid, touser, key, proxy }) {
        _WorkWeixin_instances.add(this);
        this.baseURL = 'https://qyapi.weixin.qq.com/cgi-bin/message/send';
        if (!corpid && !(key === null || key === void 0 ? void 0 : key.corpid)) {
            throw new Error('Missing Parameter: corpid');
        }
        if (!secret && !(key === null || key === void 0 ? void 0 : key.secret)) {
            throw new Error('Missing Parameter: secret');
        }
        if (!agentid && !(key === null || key === void 0 ? void 0 : key.agentid)) {
            throw new Error('Missing Parameter: agentid');
        }
        // @ts-ignore
        this._CORPID = corpid || key.corpid;
        // @ts-ignore
        this._SECRET = secret || key.corpid;
        // @ts-ignore
        this._AGENT_ID = agentid || key.agentid;
        if (touser || (key === null || key === void 0 ? void 0 : key.touser)) {
            // @ts-ignore
            this.touser = touser || key.touser;
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
            let workWeixinOptions;
            if (sendOptions.customOptions) {
                workWeixinOptions = sendOptions.customOptions;
                if (!workWeixinOptions.agentid) {
                    workWeixinOptions.agentid = this._AGENT_ID;
                }
                if (!workWeixinOptions.touser && !workWeixinOptions.totag && !workWeixinOptions.toparty) {
                    workWeixinOptions.touser = this.touser;
                }
            }
            else {
                if (!sendOptions.type || sendOptions.type === 'text') {
                    workWeixinOptions = {
                        agentid: this._AGENT_ID,
                        msgtype: 'text',
                        text: {
                            content: sendOptions.message
                        },
                        touser: this.touser
                    };
                }
                else if (sendOptions.type === 'markdown') {
                    workWeixinOptions = {
                        agentid: this._AGENT_ID,
                        msgtype: 'markdown',
                        markdown: {
                            content: sendOptions.message
                        },
                        touser: this.touser
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
                workWeixinOptions = Object.assign(Object.assign({}, workWeixinOptions), sendOptions.extraOptions);
            }
            if (!this._TOKEN) {
                const result = yield __classPrivateFieldGet(this, _WorkWeixin_instances, "m", _WorkWeixin_getToken).call(this);
                if (result.status !== 200) {
                    return result;
                }
            }
            const axiosOptions = {
                url: `${this.baseURL}?access_token=${this._TOKEN}`,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                data: workWeixinOptions
            };
            if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
            }
            return (0, axios_1.default)(axiosOptions).then((response) => {
                if (response.data) {
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
    test() {
        return this.send({ title: '测试标题', message: '测试内容' });
    }
}
exports.WorkWeixin = WorkWeixin;
_WorkWeixin_instances = new WeakSet(), _WorkWeixin_getToken = function _WorkWeixin_getToken() {
    return __awaiter(this, void 0, void 0, function* () {
        return axios_1.default.get(`https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${this._CORPID}&corpsecret=${this._SECRET}`)
            .then((response) => {
            if (response.data.access_token) {
                this._TOKEN = response.data.access_token;
                return {
                    status: 200,
                    statusText: 'Success',
                    extraMessage: response
                };
            }
            return {
                status: 104,
                statusText: 'Get "access_token" Failed',
                extraMessage: response
            };
        })
            .catch((error) => ({
            status: 104,
            statusText: 'Get "access_token" Failed',
            extraMessage: error
        }));
    });
};
