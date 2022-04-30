"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_1 = require("./resource");
class DirectMessage {
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 创建私信频道
    createDirectMessage(dm) {
        const options = {
            method: 'POST',
            url: (0, resource_1.getURL)('userMeDMURI'),
            data: dm,
        };
        return this.request(options);
    }
    // 在私信频道内发消息
    postDirectMessage(guildID, msg) {
        const options = {
            method: 'POST',
            url: (0, resource_1.getURL)('dmsURI'),
            rest: {
                guildID,
            },
            data: msg,
        };
        return this.request(options);
    }
}
exports.default = DirectMessage;
