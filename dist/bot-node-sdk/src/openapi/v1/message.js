"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_1 = require("./resource");
class Message {
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 获取指定消息
    message(channelID, messageID) {
        const options = {
            method: 'GET',
            url: (0, resource_1.getURL)('messageURI'),
            rest: {
                channelID,
                messageID,
            },
        };
        return this.request(options);
    }
    // 获取消息列表
    messages(channelID, pager) {
        const params = Object.create(null);
        if (pager && pager.type && pager.id) {
            params[pager.type] = pager.id;
            params.limit = pager.limit || 20;
        }
        const options = {
            method: 'GET',
            url: (0, resource_1.getURL)('messagesURI'),
            rest: {
                channelID,
            },
            params,
        };
        return this.request(options);
    }
    // 发送消息
    postMessage(channelID, message) {
        const options = {
            method: 'POST',
            url: (0, resource_1.getURL)('messagesURI'),
            rest: {
                channelID,
            },
            data: message,
        };
        return this.request(options);
    }
    // 撤回消息
    deleteMessage(channelID, messageID, hideTip) {
        const params = Object.create(null);
        if (hideTip) {
            params.hidetip = hideTip;
        }
        const options = {
            method: 'DELETE',
            url: (0, resource_1.getURL)('messageURI'),
            rest: {
                channelID,
                messageID,
            },
            params,
        };
        return this.request(options);
    }
}
exports.default = Message;
