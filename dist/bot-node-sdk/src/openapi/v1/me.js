"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_1 = require("./resource");
class Me {
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 获取当前用户信息
    me() {
        const options = {
            method: 'GET',
            url: (0, resource_1.getURL)('userMeURI'),
        };
        return this.request(options);
    }
    // 获取当前用户频道列表
    meGuilds(options) {
        const reqOptions = {
            method: 'GET',
            url: (0, resource_1.getURL)('userMeGuildsURI'),
            params: options,
        };
        return this.request(reqOptions);
    }
}
exports.default = Me;
