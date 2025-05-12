import { getURL } from './resource';
export default class DirectMessage {
    request;
    config;
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 创建私信频道
    createDirectMessage(dm) {
        const options = {
            method: 'POST',
            url: getURL('userMeDMURI'),
            data: dm,
        };
        return this.request(options);
    }
    // 在私信频道内发消息
    postDirectMessage(guildID, msg) {
        const options = {
            method: 'POST',
            url: getURL('dmsURI'),
            rest: {
                guildID,
            },
            data: msg,
        };
        return this.request(options);
    }
}
