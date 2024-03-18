import { Config, OpenAPIRequest, MemberAddRoleBody, MemberAPI } from '../../types';
import { RestyResponse } from 'resty-client';
export default class Member implements MemberAPI {
    request: OpenAPIRequest;
    config: Config;
    constructor(request: OpenAPIRequest, config: Config);
    memberAddRole(guildID: string, roleID: string, userID: string, channel?: string | MemberAddRoleBody): Promise<RestyResponse<any>>;
    memberDeleteRole(guildID: string, roleID: string, userID: string, channel?: string | MemberAddRoleBody): Promise<RestyResponse<any>>;
}
