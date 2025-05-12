import { getTimeStampNumber } from '../../utils/utils';
import { getURL } from './resource';
export default class Channel {
    request;
    config;
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 获取子频道信息
    channel(channelID) {
        const options = {
            method: 'GET',
            url: getURL('channelURI'),
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
            url: getURL('channelsURI'),
            rest: {
                guildID,
            },
        };
        return this.request(options);
    }
    // 创建子频道
    postChannel(guildID, channel) {
        if (channel.position === 0) {
            channel.position = getTimeStampNumber();
        }
        const options = {
            method: 'POST',
            url: getURL('channelsURI'),
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
            channel.position = getTimeStampNumber();
        }
        const options = {
            method: 'PATCH',
            url: getURL('channelURI'),
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
            url: getURL('channelURI'),
            rest: {
                channelID,
            },
        };
        return this.request(options);
    }
}
