"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultColor = exports.defaultFilter = void 0;
const resource_1 = require("./resource");
// 默认的filter：0 1 代表是否设置 0-否 1-是
exports.defaultFilter = {
    name: 1,
    color: 1,
    hoist: 1,
};
// 用户组默认颜色值
exports.defaultColor = 4278245297;
class Role {
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 获取频道身份组列表
    roles(guildID) {
        const options = {
            method: 'GET',
            url: (0, resource_1.getURL)('rolesURI'),
            rest: {
                guildID,
            },
        };
        return this.request(options);
    }
    // 创建频道身份组
    postRole(guildID, role, filter = exports.defaultFilter) {
        if (role.color === 0) {
            role.color = exports.defaultColor;
        }
        const options = {
            method: 'POST',
            url: (0, resource_1.getURL)('rolesURI'),
            rest: {
                guildID,
            },
            data: {
                guild_id: guildID,
                filter,
                info: role,
            },
        };
        return this.request(options);
    }
    // 修改频道身份组
    patchRole(guildID, roleID, role, filter = exports.defaultFilter) {
        if (role.color === 0) {
            role.color = exports.defaultColor;
        }
        const options = {
            method: 'PATCH',
            url: (0, resource_1.getURL)('roleURI'),
            rest: {
                guildID,
                roleID,
            },
            data: {
                guild_id: guildID,
                filter,
                info: role,
            },
        };
        return this.request(options);
    }
    // 删除频道身份组
    deleteRole(guildID, roleID) {
        const options = {
            method: 'DELETE',
            url: (0, resource_1.getURL)('roleURI'),
            rest: {
                guildID,
                roleID,
            },
        };
        return this.request(options);
    }
}
exports.default = Role;
