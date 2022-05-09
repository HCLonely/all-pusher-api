import { RestyResponse } from 'resty-client';
/**
 * =============  Role 身份组接口  =============
 */
export interface RoleAPI {
    roles: (guildID: string) => Promise<RestyResponse<GuildRoles>>;
    postRole: (guildID: string, role: Omit<IRole, 'id'>, filter?: IRoleFilter) => Promise<RestyResponse<UpdateRoleRes>>;
    patchRole: (guildID: string, roleID: string, role: IRole, filter?: IRoleFilter) => Promise<RestyResponse<UpdateRoleRes>>;
    deleteRole: (guildID: string, roleID: string) => Promise<RestyResponse<any>>;
}
export interface IRole {
    id: string;
    name: string;
    color: number;
    hoist: number;
    number: number;
    member_limit: number;
}
export interface IRoleFilter {
    name?: number;
    color?: number;
    hoist?: number;
}
export interface GuildRoles {
    guild_id: string;
    roles: IRole[];
    role_num_limit: string;
}
export interface UpdateRoleRes {
    role_id: string;
    guild_id: string;
    role: IRole;
}
