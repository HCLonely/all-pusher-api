import { Config, OpenAPIRequest, AnnounceAPI, IAnnounce, RecommendObj } from '../../types';
import { RestyResponse } from 'resty-client';
export default class Announce implements AnnounceAPI {
    request: OpenAPIRequest;
    config: Config;
    constructor(request: OpenAPIRequest, config: Config);
    postGuildAnnounce(guildID: string, channelID: string, messageID: string): Promise<RestyResponse<IAnnounce>>;
    deleteGuildAnnounce(guildID: string, messageID: string): Promise<RestyResponse<any>>;
    postGuildRecommend(guildID: string, recommendObj: RecommendObj): Promise<RestyResponse<IAnnounce>>;
    postChannelAnnounce(channelID: string, messageID: string): Promise<RestyResponse<IAnnounce>>;
    deleteChannelAnnounce(channelID: string, messageID: string): Promise<RestyResponse<any>>;
}
