"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_1 = require("./resource");
class Member {
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 增加频道身份组成员
    memberAddRole(guildID, roleID, userID, channel) {
        const channelObj = typeof channel === 'string'
            ? {
                channel: {
                    id: channel,
                },
            }
            : channel;
        const options = {
            method: 'PUT',
            url: (0, resource_1.getURL)('memberRoleURI'),
            rest: {
                guildID,
                userID,
                roleID,
            },
            data: channelObj,
        };
        return this.request(options);
    }
    // 删除频道身份组成员
    memberDeleteRole(guildID, roleID, userID, channel) {
        const channelObj = typeof channel === 'string'
            ? {
                channel: {
                    id: channel,
                },
            }
            : channel;
        const options = {
            method: 'DELETE',
            url: (0, resource_1.getURL)('memberRoleURI'),
            rest: {
                guildID,
                userID,
                roleID,
            },
            data: channelObj,
        };
        return this.request(options);
    }
}
exports.default = Member;