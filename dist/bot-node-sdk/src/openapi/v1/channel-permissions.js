"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_1 = require("./resource");
class ChannelPermissions {
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 获取指定子频道的权限
    channelPermissions(channelID, userID) {
        const options = {
            method: 'GET',
            url: (0, resource_1.getURL)('channelPermissionsURI'),
            rest: {
                channelID,
                userID,
            },
        };
        return this.request(options);
    }
    // 修改指定子频道的权限
    putChannelPermissions(channelID, userID, p) {
        try {
            // 校验参数
            parseInt(p.add, 10);
            parseInt(p.remove, 10);
        }
        catch (error) {
            return Promise.reject(new Error('invalid parameter'));
        }
        const options = {
            method: 'PUT',
            url: (0, resource_1.getURL)('channelPermissionsURI'),
            rest: {
                channelID,
                userID,
            },
            data: p,
        };
        return this.request(options);
    }
    // 获取指定子频道身份组的权限
    channelRolePermissions(channelID, roleID) {
        const options = {
            method: 'GET',
            url: (0, resource_1.getURL)('channelRolePermissionsURI'),
            rest: {
                channelID,
                roleID,
            },
        };
        return this.request(options);
    }
    // 修改指定子频道身份组的权限
    putChannelRolePermissions(channelID, roleID, p) {
        try {
            // 校验参数
            parseInt(p.add, 10);
            parseInt(p.remove, 10);
        }
        catch (error) {
            return Promise.reject(new Error('invalid parameter'));
        }
        const options = {
            method: 'PUT',
            url: (0, resource_1.getURL)('channelRolePermissionsURI'),
            rest: {
                channelID,
                roleID,
            },
            data: p,
        };
        return this.request(options);
    }
}
exports.default = ChannelPermissions;
