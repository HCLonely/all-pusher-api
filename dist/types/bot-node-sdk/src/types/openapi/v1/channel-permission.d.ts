import { RestyResponse } from 'resty-client';
/**
 * =============  ChannelPermissions 子频道权限接口  =============
 */
export interface ChannelPermissionsAPI {
    channelPermissions: (channelID: string, userID: string) => Promise<RestyResponse<IChannelPermissions>>;
    putChannelPermissions: (channelID: string, userID: string, p: UpdateChannelPermissions) => Promise<RestyResponse<any>>;
    channelRolePermissions: (channelID: string, roleID: string) => Promise<RestyResponse<IChannelRolePermissions>>;
    putChannelRolePermissions: (channelID: string, roleID: string, p: UpdateChannelPermissions) => Promise<RestyResponse<any>>;
}
export interface IChannelPermissions {
    channel_id: string;
    user_id: string;
    permissions: string;
}
export interface IChannelRolePermissions {
    channel_id: string;
    role_id: string;
    permissions: string;
}
export interface UpdateChannelPermissions {
    add: string;
    remove: string;
}
