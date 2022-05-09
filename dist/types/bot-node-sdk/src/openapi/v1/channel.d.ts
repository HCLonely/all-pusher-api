import { Config, OpenAPIRequest, ChannelAPI, PostChannelObj, IChannel, PatchChannelObj } from '../../types';
import { RestyResponse } from 'resty-client';
export default class Channel implements ChannelAPI {
    request: OpenAPIRequest;
    config: Config;
    constructor(request: OpenAPIRequest, config: Config);
    channel(channelID: string): Promise<RestyResponse<IChannel>>;
    channels(guildID: string): Promise<RestyResponse<IChannel[]>>;
    postChannel(guildID: string, channel: PostChannelObj): Promise<RestyResponse<IChannel>>;
    patchChannel(channelID: string, channel: PatchChannelObj): Promise<RestyResponse<IChannel>>;
    deleteChannel(channelID: string): Promise<RestyResponse<any>>;
}
