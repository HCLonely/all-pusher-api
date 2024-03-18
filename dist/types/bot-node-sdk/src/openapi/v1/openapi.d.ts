import { RequestOptions, RestyResponse } from 'resty-client';
import { GuildAPI, ChannelAPI, MeAPI, MessageAPI, Config, IOpenAPI, MemberAPI, RoleAPI, DirectMessageAPI, ChannelPermissionsAPI, AudioAPI, MuteAPI, ScheduleAPI, AnnounceAPI, GuildPermissionsAPI, ReactionAPI, PinsMessageAPI } from '../../types';
export declare const apiVersion = "v1";
export declare class OpenAPI implements IOpenAPI {
    static newClient(config: Config): OpenAPI;
    config: Config;
    guildApi: GuildAPI;
    channelApi: ChannelAPI;
    meApi: MeAPI;
    messageApi: MessageAPI;
    memberApi: MemberAPI;
    roleApi: RoleAPI;
    muteApi: MuteAPI;
    announceApi: AnnounceAPI;
    scheduleApi: ScheduleAPI;
    directMessageApi: DirectMessageAPI;
    channelPermissionsApi: ChannelPermissionsAPI;
    audioApi: AudioAPI;
    reactionApi: ReactionAPI;
    pinsMessageApi: PinsMessageAPI;
    guildPermissionsApi: GuildPermissionsAPI;
    constructor(config: Config);
    register(client: IOpenAPI): void;
    request<T extends Record<any, any> = any>(options: RequestOptions): Promise<RestyResponse<T>>;
}
export declare function v1Setup(): void;
