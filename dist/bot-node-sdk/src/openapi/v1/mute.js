"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_1 = require("./resource");
class Mute {
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
            url: (0, resource_1.getURL)('muteMemberURI'),
            rest: {
                guildID,
                userID,
            },
            data: {
                mute_end_timestamp: options === null || options === void 0 ? void 0 : options.timeTo,
                mute_seconds: options === null || options === void 0 ? void 0 : options.seconds,
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
            url: (0, resource_1.getURL)('muteURI'),
            rest: {
                guildID,
            },
            data: {
                mute_end_timestamp: options === null || options === void 0 ? void 0 : options.timeTo,
                mute_seconds: options === null || options === void 0 ? void 0 : options.seconds,
            },
        };
        return this.request(reqOptions);
    }
}
exports.default = Mute;
