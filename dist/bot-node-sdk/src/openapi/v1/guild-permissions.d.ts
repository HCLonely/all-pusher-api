import { GuildPermissionRes, GuildPermissionDemand, GuildPermissionsAPI, Config, OpenAPIRequest, PermissionDemandToCreate } from '../../types';
import { RestyResponse } from 'resty-client';
export default class GuildPermissions implements GuildPermissionsAPI {
    request: OpenAPIRequest;
    config: Config;
    constructor(request: OpenAPIRequest, config: Config);
    permissions(guildID: string): Promise<RestyResponse<GuildPermissionRes>>;
    postPermissionDemand(guildID: string, permissionDemandObj: PermissionDemandToCreate): Promise<RestyResponse<GuildPermissionDemand>>;
}
