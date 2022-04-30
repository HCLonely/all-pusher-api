import { RestyResponse } from 'resty-client';
/**
 * =============  Announce 公告接口  =============
 */
export interface AnnounceAPI {
    postGuildAnnounce: (guildID: string, channelID: string, messageID: string) => Promise<RestyResponse<IAnnounce>>;
    deleteGuildAnnounce: (guildID: string, messageID: string) => Promise<RestyResponse<any>>;
    postGuildRecommend: (guildID: string, recommendObj: RecommendObj) => Promise<RestyResponse<IAnnounce>>;
    postChannelAnnounce: (channelID: string, messageID: string) => Promise<RestyResponse<IAnnounce>>;
    deleteChannelAnnounce: (channelID: string, messageID: string) => Promise<RestyResponse<any>>;
}
export interface IAnnounce {
    guild_id: string;
    channel_id: string;
    message_id: string;
    announce_type?: number;
    recommend_channels?: RecommendChannel[];
}
export interface RecommendObj {
    announces_type?: number;
    recommend_channels: RecommendChannel[];
}
export interface RecommendChannel {
    channel_id: string;
    introduce: string;
}
