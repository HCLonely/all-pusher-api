import { OpenAPIRequest, Config, ChannelPermissionsAPI, IChannelPermissions, IChannelRolePermissions, UpdateChannelPermissions } from '../../types';
import { RestyResponse } from 'resty-client';
export default class ChannelPermissions implements ChannelPermissionsAPI {
    request: OpenAPIRequest;
    config: Config;
    constructor(request: OpenAPIRequest, config: Config);
    channelPermissions(channelID: string, userID: string): Promise<RestyResponse<IChannelPermissions>>;
    putChannelPermissions(channelID: string, userID: string, p: UpdateChannelPermissions): Promise<RestyResponse<any>>;
    channelRolePermissions(channelID: string, roleID: string): Promise<RestyResponse<IChannelRolePermissions>>;
    putChannelRolePermissions(channelID: string, roleID: string, p: UpdateChannelPermissions): Promise<RestyResponse<any>>;
}
