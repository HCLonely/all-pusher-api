import { Config, IPinsMessage, OpenAPIRequest, PinsMessageAPI } from '../../types';
import { RestyResponse } from 'resty-client';
export default class PinsMessage implements PinsMessageAPI {
    request: OpenAPIRequest;
    config: Config;
    constructor(request: OpenAPIRequest, config: Config);
    pinsMessage(channelID: string): Promise<RestyResponse<IPinsMessage>>;
    putPinsMessage(channelID: string, messageID: string): Promise<RestyResponse<IPinsMessage>>;
    deletePinsMessage(channelID: string, messageID: string): Promise<RestyResponse<any>>;
}
