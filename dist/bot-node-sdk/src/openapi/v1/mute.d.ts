import { Config, OpenAPIRequest, MuteAPI, MuteOptions } from '../../types';
import { RestyResponse } from 'resty-client';
export default class Mute implements MuteAPI {
    request: OpenAPIRequest;
    config: Config;
    constructor(request: OpenAPIRequest, config: Config);
    muteMember(guildID: string, userID: string, options: MuteOptions): Promise<RestyResponse<any>>;
    muteAll(guildID: string, options: MuteOptions): Promise<RestyResponse<any>>;
}
