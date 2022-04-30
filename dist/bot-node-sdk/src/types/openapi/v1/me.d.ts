import { RestyResponse } from 'resty-client';
import { IGuild } from './guild';
/**
 * =============  User 用户接口  =============
 */
export interface MeAPI {
    me: () => Promise<RestyResponse<IUser>>;
    meGuilds: (options?: MeGuildsReq) => Promise<RestyResponse<IGuild[]>>;
}
export interface IUser {
    id: string;
    username: string;
    avatar: string;
    bot: boolean;
    union_openid: string;
    union_user_account: string;
}
export interface MeGuildsReq {
    before?: string;
    after?: string;
    limit?: number;
}
