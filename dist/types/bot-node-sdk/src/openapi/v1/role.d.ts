import { Config, OpenAPIRequest, GuildRoles, IRole, IRoleFilter, RoleAPI, UpdateRoleRes } from '../../types';
import { RestyResponse } from 'resty-client';
export declare const defaultFilter: IRoleFilter;
export declare const defaultColor = 4278245297;
export default class Role implements RoleAPI {
    request: OpenAPIRequest;
    config: Config;
    constructor(request: OpenAPIRequest, config: Config);
    roles(guildID: string): Promise<RestyResponse<GuildRoles>>;
    postRole(guildID: string, role: Omit<IRole, 'id'>, filter?: IRoleFilter): Promise<RestyResponse<UpdateRoleRes>>;
    patchRole(guildID: string, roleID: string, role: IRole, filter?: IRoleFilter): Promise<RestyResponse<UpdateRoleRes>>;
    deleteRole(guildID: string, roleID: string): Promise<RestyResponse<any>>;
}
