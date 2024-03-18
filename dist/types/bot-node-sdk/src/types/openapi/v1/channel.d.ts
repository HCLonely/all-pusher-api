import { RestyResponse } from 'resty-client';
/**
 * =============  Channel 子频道接口  =============
 */
export interface ChannelAPI {
    channel: (channelID: string) => Promise<RestyResponse<IChannel>>;
    channels: (guildID: string) => Promise<RestyResponse<IChannel[]>>;
    postChannel: (guildID: string, channel: PostChannelObj) => Promise<RestyResponse<IChannel>>;
    patchChannel: (channelID: string, channel: PatchChannelObj) => Promise<RestyResponse<IChannel>>;
    deleteChannel: (channelID: string) => Promise<RestyResponse<any>>;
}
export type ChannelType = 0 | 1 | 2 | 3 | 4 | 10005;
export type ChannelSubType = 0 | 1 | 2 | 3;
export interface IChannel extends PostChannelObj {
    id: string;
    guild_id: string;
    owner_id: string;
    speak_permission?: number;
    application_id?: string;
}
export interface PostChannelObj {
    name: string;
    type: ChannelType;
    sub_type?: ChannelSubType;
    position: number;
    parent_id: string;
    private_type?: number;
    private_user_ids?: string[];
    permissions?: string;
}
export type PatchChannelObj = Partial<Omit<PostChannelObj, 'sub_type' | 'private_user_ids'>>;
