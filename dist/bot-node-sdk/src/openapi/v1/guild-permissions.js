import { getURL } from './resource';
export default class GuildPermissions {
    request;
    config;
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 获取频道可用权限列表
    permissions(guildID) {
        const options = {
            method: 'GET',
            url: getURL('guildPermissionURI'),
            rest: {
                guildID,
            },
        };
        return this.request(options);
    }
    // 创建频道 API 接口权限授权链接
    postPermissionDemand(guildID, permissionDemandObj) {
        const options = {
            method: 'POST',
            url: getURL('guildPermissionDemandURI'),
            rest: {
                guildID,
            },
            data: permissionDemandObj,
        };
        return this.request(options);
    }
}
