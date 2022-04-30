"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const resource_1 = require("./resource");
class Channel {
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 获取子频道信息
    channel(channelID) {
        const options = {
            method: 'GET',
            url: (0, resource_1.getURL)('channelURI'),
            rest: {
                channelID,
            },
        };
        return this.request(options);
    }
    // 获取频道下的子频道列表
    channels(guildID) {
        const options = {
            method: 'GET',
            url: (0, resource_1.getURL)('channelsURI'),
            rest: {
                guildID,
            },
        };
        return this.request(options);
    }
    // 创建子频道
    postChannel(guildID, channel) {
        if (channel.position === 0) {
            channel.position = (0, utils_1.getTimeStampNumber)();
        }
        const options = {
            method: 'POST',
            url: (0, resource_1.getURL)('channelsURI'),
            rest: {
                guildID,
            },
            data: channel,
        };
        return this.request(options);
    }
    // 修改子频道信息
    patchChannel(channelID, channel) {
        if (channel.position === 0) {
            channel.position = (0, utils_1.getTimeStampNumber)();
        }
        const options = {
            method: 'PATCH',
            url: (0, resource_1.getURL)('channelURI'),
            rest: {
                channelID,
            },
            data: channel,
        };
        return this.request(options);
    }
    // 删除指定子频道
    deleteChannel(channelID) {
        const options = {
            method: 'DELETE',
            url: (0, resource_1.getURL)('channelURI'),
            rest: {
                channelID,
            },
        };
        return this.request(options);
    }
}
exports.default = Channel;
