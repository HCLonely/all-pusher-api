import { getURL } from './resource';
export default class PinsMessage {
    request;
    config;
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 获取精华消息
    pinsMessage(channelID) {
        const options = {
            method: 'GET',
            url: getURL('pinsMessageURI'),
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
            url: getURL('pinsMessageIdURI'),
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
            url: getURL('pinsMessageIdURI'),
            rest: {
                channelID,
                messageID,
            },
        };
        return this.request(options);
    }
}
