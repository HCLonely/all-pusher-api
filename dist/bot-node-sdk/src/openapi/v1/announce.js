"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_1 = require("./resource");
class Announce {
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 创建guild公告
    postGuildAnnounce(guildID, channelID, messageID) {
        const options = {
            method: 'POST',
            url: (0, resource_1.getURL)('guildAnnouncesURI'),
            rest: {
                guildID,
            },
            data: {
                channel_id: channelID,
                message_id: messageID,
            },
        };
        return this.request(options);
    }
    // 删除guild公告
    deleteGuildAnnounce(guildID, messageID) {
        const options = {
            method: 'DELETE',
            url: (0, resource_1.getURL)('guildAnnounceURI'),
            rest: {
                guildID,
                messageID,
            },
        };
        return this.request(options);
    }
    // 创建频道公告推荐子频道
    postGuildRecommend(guildID, recommendObj) {
        const options = {
            method: 'POST',
            url: (0, resource_1.getURL)('guildAnnouncesURI'),
            rest: {
                guildID,
            },
            data: recommendObj,
        };
        return this.request(options);
    }
    // 创建channel公告
    postChannelAnnounce(channelID, messageID) {
        const options = {
            method: 'POST',
            url: (0, resource_1.getURL)('channelAnnouncesURI'),
            rest: {
                channelID,
            },
            data: {
                message_id: messageID,
            },
        };
        return this.request(options);
    }
    // 删除channel公告
    deleteChannelAnnounce(channelID, messageID) {
        const options = {
            method: 'DELETE',
            url: (0, resource_1.getURL)('channelAnnounceURI'),
            rest: {
                channelID,
                messageID,
            },
        };
        return this.request(options);
    }
}
exports.default = Announce;
