import { RestyResponse } from 'resty-client';
/**
 * =============  Mute 禁言接口  =============
 */
export interface MuteAPI {
    muteMember: (guildID: string, userID: string, options: MuteOptions) => Promise<RestyResponse<any>>;
    muteAll: (guildID: string, options: MuteOptions) => Promise<RestyResponse<any>>;
}
export interface MuteOptions {
    timeTo?: string;
    seconds?: string;
}
