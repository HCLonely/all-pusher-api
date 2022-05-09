import { Config, OpenAPIRequest, GuildAPI, GuildMembersPager, IGuild, IMember } from '../../types';
import { RestyResponse } from 'resty-client';
export default class Guild implements GuildAPI {
    request: OpenAPIRequest;
    config: Config;
    constructor(request: OpenAPIRequest, config: Config);
    guild(guildID: string): Promise<RestyResponse<IGuild>>;
    guildMember(guildID: string, userID: string): Promise<RestyResponse<IMember>>;
    guildMembers(guildID: string, pager?: GuildMembersPager): Promise<RestyResponse<IMember[]>>;
    deleteGuildMember(guildID: string, userID: string): Promise<RestyResponse<any>>;
}
