"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_1 = require("./resource");
class Guild {
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 获取频道信息
    guild(guildID) {
        const options = {
            method: 'GET',
            url: (0, resource_1.getURL)('guildURI'),
            rest: {
                guildID,
            },
        };
        return this.request(options);
    }
    // 获取某个成员信息
    guildMember(guildID, userID) {
        const options = {
            method: 'GET',
            url: (0, resource_1.getURL)('guildMemberURI'),
            rest: {
                guildID,
                userID,
            },
        };
        return this.request(options);
    }
    // 获取频道成员列表
    guildMembers(guildID, pager) {
        pager = pager || { after: '0', limit: 1 };
        const options = {
            method: 'GET',
            url: (0, resource_1.getURL)('guildMembersURI'),
            rest: {
                guildID,
            },
            params: pager,
        };
        return this.request(options);
    }
    // 删除指定频道成员
    deleteGuildMember(guildID, userID) {
        const options = {
            method: 'DELETE',
            url: (0, resource_1.getURL)('guildMemberURI'),
            rest: {
                guildID,
                userID,
            },
        };
        return this.request(options);
    }
}
exports.default = Guild;
