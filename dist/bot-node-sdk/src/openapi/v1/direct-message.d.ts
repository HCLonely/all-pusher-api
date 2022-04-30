import { OpenAPIRequest, Config, DirectMessageAPI, DirectMessageToCreate, IDirectMessage, IMessage, MessageToCreate } from '../../types';
import { RestyResponse } from 'resty-client';
export default class DirectMessage implements DirectMessageAPI {
    request: OpenAPIRequest;
    config: Config;
    constructor(request: OpenAPIRequest, config: Config);
    createDirectMessage(dm: DirectMessageToCreate): Promise<RestyResponse<IDirectMessage>>;
    postDirectMessage(guildID: string, msg: MessageToCreate): Promise<RestyResponse<IMessage>>;
}
