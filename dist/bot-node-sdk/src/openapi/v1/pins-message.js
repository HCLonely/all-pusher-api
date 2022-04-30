"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_1 = require("./resource");
class PinsMessage {
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 获取精华消息
    pinsMessage(channelID) {
        const options = {
            method: 'GET',
            url: (0, resource_1.getURL)('pinsMessageURI'),
            rest: {
                channelID,
            },
        };
        return this.request(options);
    }
    // 发送精华消息
    putPinsMessage(channelID, messageID) {
        const options = {
            method: 'PUT',
            url: (0, resource_1.getURL)('pinsMessageIdURI'),
            headers: {
                'Content-Type': 'application/json;',
            },
            rest: {
                channelID,
                messageID,
            },
        };
        return this.request(options);
    }
    // 删除精华消息
    deletePinsMessage(channelID, messageID) {
        const options = {
            method: 'DELETE',
            url: (0, resource_1.getURL)('pinsMessageIdURI'),
            rest: {
                channelID,
                messageID,
            },
        };
        return this.request(options);
    }
}
exports.default = PinsMessage;
