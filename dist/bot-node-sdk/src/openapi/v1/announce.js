import { getURL } from './resource';
export default class Announce {
    request;
    config;
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 创建guild公告
    postGuildAnnounce(guildID, channelID, messageID) {
        const options = {
            method: 'POST',
            url: getURL('guildAnnouncesURI'),
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
            url: getURL('guildAnnounceURI'),
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
            url: getURL('guildAnnouncesURI'),
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
            url: getURL('channelAnnouncesURI'),
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
            url: getURL('channelAnnounceURI'),
            rest: {
                channelID,
                messageID,
            },
        };
        return this.request(options);
    }
}
