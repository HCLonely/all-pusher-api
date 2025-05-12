import { getURL } from './resource';
export default class Me {
    request;
    config;
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 获取当前用户信息
    me() {
        const options = {
            method: 'GET',
            url: getURL('userMeURI'),
        };
        return this.request(options);
    }
    // 获取当前用户频道列表
    meGuilds(options) {
        const reqOptions = {
            method: 'GET',
            url: getURL('userMeGuildsURI'),
            params: options,
        };
        return this.request(reqOptions);
    }
}
