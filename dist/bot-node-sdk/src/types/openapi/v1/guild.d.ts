import { RestyResponse } from 'resty-client';
import { IChannel } from './channel';
import { IUser } from './me';
/**
 * =============  Guild 频道接口  =============
 */
export interface GuildAPI {
    guild: (guildID: string) => Promise<RestyResponse<IGuild>>;
    guildMember: (guildID: string, userID: string) => Promise<RestyResponse<IMember>>;
    guildMembers: (guildID: string, pager?: GuildMembersPager) => Promise<RestyResponse<IMember[]>>;
    deleteGuildMember: (guildID: string, userID: string) => Promise<RestyResponse<any>>;
}
export interface IGuild {
    id: string;
    name: string;
    icon: string;
    owner_id: string;
    owner: boolean;
    member_count: number;
    max_members: number;
    description: string;
    joined_at: number;
    channels: IChannel[];
    unionworld_id: string;
    union_org_id: string;
}
export interface IMember {
    guild_id: string;
    joined_at: string;
    nick: string;
    user: IUser;
    roles: string[];
    deaf: boolean;
    mute: boolean;
}
export interface GuildMembersPager {
    after: string;
    limit: number;
}
