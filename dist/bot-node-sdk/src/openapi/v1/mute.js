import { getURL } from './resource';
export default class Mute {
    request;
    config;
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 禁言某个member
    muteMember(guildID, userID, options) {
        if (!options) {
            return Promise.reject(new Error("'options' required!"));
        }
        const reqOptions = {
            method: 'PATCH',
            url: getURL('muteMemberURI'),
            rest: {
                guildID,
                userID,
            },
            data: {
                mute_end_timestamp: options?.timeTo,
                mute_seconds: options?.seconds,
            },
        };
        return this.request(reqOptions);
    }
    // 禁言所有人
    muteAll(guildID, options) {
        if (!options) {
            return Promise.reject(new Error("'options' required!"));
        }
        const reqOptions = {
            method: 'PATCH',
            url: getURL('muteURI'),
            rest: {
                guildID,
            },
            data: {
                mute_end_timestamp: options?.timeTo,
                mute_seconds: options?.seconds,
            },
        };
        return this.request(reqOptions);
    }
}
