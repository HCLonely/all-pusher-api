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
exports.Custom = void 0;
/* global result, CustomConfig */
const axios_1 = require("axios");
const tool_1 = require("./tool");
class Custom {
    constructor({ url, method, contentType, headers, key, success, proxy }) {
        this.method = 'POST';
        this.contentType = 'application/json';
        if (!url && !(key === null || key === void 0 ? void 0 : key.url)) {
            throw new Error('Missing Parameter: url');
        }
        if (!success && !(key === null || key === void 0 ? void 0 : key.success)) {
            throw new Error('Missing Parameter: success');
        }
        // @ts-ignore
        this._URL = url || key.url;
        // @ts-ignore
        this.success = success || key.success;
        if (method || (key === null || key === void 0 ? void 0 : key.method)) {
            // @ts-ignore
            this.method = method || key.method;
        }
        if (contentType || (key === null || key === void 0 ? void 0 : key.contentType)) {
            // @ts-ignore
            this.contentType = contentType || key.contentType;
        }
        if (headers || (key === null || key === void 0 ? void 0 : key.headers)) {
            // @ts-ignore
            this._HEADERS = headers || key.headers;
        }
        if (proxy) {
            this.httpsAgent = (0, tool_1.proxy2httpsAgent)(proxy);
        }
    }
    send(sendOptions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const axiosOptions = {
                url: this._URL,
                method: this.method,
                headers: {
                    'Content-type': 'application/json'
                },
                data: sendOptions.extraMessage || sendOptions
            };
            if (this._HEADERS) {
                axiosOptions.headers = this._HEADERS;
            }
            if (this.contentType) {
                axiosOptions.headers['Content-type'] = this.contentType;
            }
            if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
            }
            if (((_a = axiosOptions.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === 'POST' &&
                axiosOptions.headers['Content-type'] === 'application/x-www-form-urlencoded') {
                axiosOptions.data = (0, tool_1.queryStringify)(sendOptions);
            }
            if (((_b = axiosOptions.method) === null || _b === void 0 ? void 0 : _b.toUpperCase()) === 'GET') {
                axiosOptions.data = null;
                axiosOptions.url += (0, tool_1.queryStringify)(sendOptions);
            }
            return (0, axios_1.default)(axiosOptions).then((response) => {
                if (response.data) {
                    let variate = response.data;
                    this.success.key.split('.').forEach((key, index) => {
                        if (index === 0) {
                            return;
                        }
                        variate = variate === null || variate === void 0 ? void 0 : variate[key];
                    });
                    if (variate === this.success.value) {
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
exports.Custom = Custom;
