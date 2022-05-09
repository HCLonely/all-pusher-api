import { RestyResponse } from 'resty-client';
import { IMessage, MessageToCreate } from './message';
/**
 * =============  DirectMessage 私信接口  =============
 */
export interface DirectMessageAPI {
    createDirectMessage: (dm: DirectMessageToCreate) => Promise<RestyResponse<IDirectMessage>>;
    postDirectMessage: (guildID: string, msg: MessageToCreate) => Promise<RestyResponse<IMessage>>;
}
export interface DirectMessageToCreate {
    source_guild_id: string;
    recipient_id: string;
}
export interface IDirectMessage {
    guild_id: string;
    channel_id: string;
    create_time: string;
}
