import { getURL } from './resource';
export default class Guild {
    request;
    config;
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 获取频道信息
    guild(guildID) {
        const options = {
            method: 'GET',
            url: getURL('guildURI'),
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
            url: getURL('guildMemberURI'),
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
            url: getURL('guildMembersURI'),
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
            url: getURL('guildMemberURI'),
            rest: {
                guildID,
                userID,
            },
        };
        return this.request(options);
    }
}
