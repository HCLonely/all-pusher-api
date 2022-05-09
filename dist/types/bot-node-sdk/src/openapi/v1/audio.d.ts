import { AudioAPI, AudioControl, Config, OpenAPIRequest } from '../../types';
import { RestyResponse } from 'resty-client';
export default class Audio implements AudioAPI {
    request: OpenAPIRequest;
    config: Config;
    constructor(request: OpenAPIRequest, config: Config);
    postAudio(channelID: string, audioControl: AudioControl): Promise<RestyResponse<AudioControl>>;
}
