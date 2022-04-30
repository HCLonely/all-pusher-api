"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_1 = require("./resource");
class GuildPermissions {
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 获取频道可用权限列表
    permissions(guildID) {
        const options = {
            method: 'GET',
            url: (0, resource_1.getURL)('guildPermissionURI'),
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
            url: (0, resource_1.getURL)('guildPermissionDemandURI'),
            rest: {
                guildID,
            },
            data: permissionDemandObj,
        };
        return this.request(options);
    }
}
exports.default = GuildPermissions;
