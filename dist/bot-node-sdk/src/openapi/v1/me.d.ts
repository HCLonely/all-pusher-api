import { Config, OpenAPIRequest, IUser, MeAPI, IGuild, MeGuildsReq } from '../../types';
import { RestyResponse } from 'resty-client';
export default class Me implements MeAPI {
    request: OpenAPIRequest;
    config: Config;
    constructor(request: OpenAPIRequest, config: Config);
    me(): Promise<RestyResponse<IUser>>;
    meGuilds(options?: MeGuildsReq): Promise<RestyResponse<IGuild[]>>;
}
