import { RestyResponse } from 'resty-client';
/**
 * =============  GuildPermission API权限接口  =============
 */
export interface GuildPermissionsAPI {
    permissions: (guildID: string) => Promise<RestyResponse<GuildPermissionRes>>;
    postPermissionDemand: (guildID: string, permissionDemandObj: PermissionDemandToCreate) => Promise<RestyResponse<GuildPermissionDemand>>;
}
export interface GuildPermission {
    path: string;
    method: string;
    desc: string;
    auth_status: number;
}
export interface GuildPermissionRes {
    apis: GuildPermission[];
}
export interface GuildPermissionDemand {
    guild_id: string;
    channel_id: string;
    api_identify: GuildPermissionDemandIdentify;
    title: string;
    desc: string;
}
export interface PermissionDemandToCreate {
    channel_id: string;
    api_identify: GuildPermissionDemandIdentify;
    desc?: string;
}
export interface GuildPermissionDemandIdentify {
    path: string;
    method: string;
}
