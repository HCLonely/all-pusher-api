import { Config, OpenAPIRequest, ReactionAPI, ReactionObj } from '../../types';
import { RestyResponse } from 'resty-client';
export default class Reaction implements ReactionAPI {
    request: OpenAPIRequest;
    config: Config;
    constructor(request: OpenAPIRequest, config: Config);
    postReaction(channelId: string, reactionToCreate: ReactionObj): Promise<RestyResponse<any>>;
    deleteReaction(channelId: string, reactionToDelete: ReactionObj): Promise<RestyResponse<any>>;
}
